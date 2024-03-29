# Link to views from urls
from django.http import HttpResponse
from google_cloud.gcs_speech_to_text import gcs_speech_to_text as transcribe
import cohere
import os
from dotenv import load_dotenv
from google_cloud.convert_audio import convert_webm_to_wav
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


# Get audio file directories
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)
inputpath = os.path.join(parent_dir, 'audio.webm')
outputpath = os.path.join(parent_dir, 'audio.wav')

# Summarize global variables
summary = ""
buffer = ""
summarized = False
transcription = ""
# Message global data (for tone/parent selections)
message_prompt = ""
def reprompt(tone, msg = "", transcription=""):
    if tone == "stern" :
        msg = (
              "You are a demanding and strict parent with no tolerance for academic laziness.\n" +
              "Your child needs to understand their lecture notes perfectly. No excuses.\n" +
              "Explain the concept from the notes with sharp precision and a stern tone, emphasizing the absolute necessity of mastering this material for their future success. \n" +
              "User Input:\n{}\n\n" + "Text:\n{}\n\n").format(msg, transcription)
    else:
        msg = ("You are a supportive and understanding parent who values education and personal growth. \n" + 
                "You realize that your child might be struggling with their lecture notes and needs a gentle nudge towards appreciating their importance. \n" + 
                "With a tone of encouragement and patience, explain the concept from the notes, highlighting how mastering this material can open doors to a bright and successful future. \n " +
                "User Input:\n{}\n\n" + "Text:\n{}\n\n").format(msg, transcription)
    return msg


def summarize(request):
    global summary
    global summarized
    
    if not summarized:
        print("study session started") 

        # We are starting a new converstation, clear the buffer
        buffer = ""
        
        # Default for if you have no class information
        if summary == "":
            summary = "Child how dare you not be attending class."
            print("No transcription found")

        # Return
        buffer = buffer + summary + "\n"
        print(summary)
        summarized = True
        return HttpResponse(summary)
    else:
        return HttpResponse("")


class Upload(View):
    print("Received")
    
    def __init__(self):
        self.audio_file = None

    @csrf_exempt
    def post(self, request):
        
        global summary
        global transcription
        print("Process Started")

        # Download the file
        if request.method == 'POST':
            print("getting post request")
            
            self.audio_file = request.FILES['audio'] # get the uploaded file
            with open('audio.webm', 'wb+') as destination:
                for chunk in self.audio_file.chunks():
                    destination.write(chunk)
            print("file uploaded")

        elif request.method == 'GET':
            print("getting get request")

        print("Done download")
        load_dotenv() #Load the environment variables

        # Convert the webm file to wav
        convert_webm_to_wav(inputpath, outputpath)
        # Send the wav file to the speech to text api
        transcription += transcribe(outputpath)
        print(transcription)
        prompt = "You are a parent who values education and personal growth. Explain the concept from the notes with sharp precision" + ("\nText:\n{}\n\n").format(transcription)
        # Send the transcription to the summarization api
        if prompt != "":
            print("Sending to cohere")
            co = cohere.Client(os.getenv("COHERE_API_KEY"))
            summary += co.summarize(text=prompt).summary
        else:
            print(summary)

        return HttpResponse(summary)


class Message(View):
    print("Received")
    global history
    
    def __init__(self):
        self.message = None,
        self.message_prompt = None,
        self.history = []
        self.parent = "mother" # default is mom
        self.tone = "stern" # default is stern
        self.response = None
    
    @csrf_exempt
    def post(self, request):
        print("Process Started")
        global summary
        global transcription
        if request.method == 'POST':
            # Receiving request
            print("getting post request")
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            
            # Setting request params
            self.message = data['message']
            self.parent = data['parent']
            self.tone = data['tone']
            print(self.message)
            
            # Reformatting prompt message
            self.message_prompt = reprompt(self.tone, self.message, transcription)
            
            # Calling Cohere API
            print("Sending to cohere")
            co = cohere.Client(os.getenv("COHERE_API_KEY"))
            print(self.message_prompt)
            self.response = co.generate(
                 model='command',
                    prompt=self.message_prompt,
                    max_tokens=300,
                    temperature=0.75,
                    k=0,
                    stop_sequences=[],
                    return_likelihoods='NONE').generations[0].text
            
            # Saving history
            self.history.append({ # User
                "role": "USER",
                "message": self.message
            })
            self.history.append({ # Parent
                "role": "PARENT",
                "message": self.response
            })            

        elif request.method == 'GET':
            print("getting get request")
        
        print(self.response)

        return HttpResponse(self.response)
        
    
    
