from django.http import HttpResponse
from google_cloud.gcs_speech_to_text import gcs_speech_to_text as transcribe
import cohere
import os
from dotenv import load_dotenv
from google_cloud.convert_audio import convert_webm_to_wav
from django.views.decorators.csrf import csrf_exempt
from django.views import View

#Get audio file directories
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)
inputpath = os.path.join(parent_dir, 'Test.webm')
outputpath = os.path.join(parent_dir, 'Test.wav')

summary = ""
buffer = ""

def summarize(request):
    global summary
    print("study session started") 

    #We are starting a new converstation, clear the buffer
    buffer = ""

    #Default for if you have no class information
    if summary == "":
        summary = "Disgraceful child how dare you not be attending class, " \
        "you are a disgrace to the family. You are not my child. I am disowning you."\
        " You are no longer my child."
        print("No transcription found")

    #Return
    buffer = buffer + summary + "\n"
    print(summary)
    return HttpResponse(summary)


class Upload(View):
    print("Recieved")
    
    def __init__(self):
        self.audio_file = None

    @csrf_exempt
    def post(self, request):
        global summary
        print("Process Started")

        #Download the file
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

        #Convert the webm file to wav
        convert_webm_to_wav(inputpath, outputpath)

        #Send the wav file to the speech to text api
        transcription = ""
        transcription += transcribe(outputpath)

        #Send the transcription to the summarization api
        if transcription != "":
            print("Sending to cohere")
            co = cohere.Client(os.getenv("COHERE_API_KEY"))
            summary += co.summarize(text=transcription).summary

        print(summary)

        return HttpResponse(summary)
        
