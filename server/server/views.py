from django.http import HttpResponse
from ..google_cloud.gcs_speech_to_text import gcs_speech_to_text as transcribe
import cohere
import os
from dotenv import load_dotenv


buffer = ""
audiopath = '/Users/ryans/Downloads/Test.wav'

def summarize():
    print("Pipeline started")
    load_dotenv() #Load the environment variables

    #We are starting a new converstation, clear the buffer
    buffer = ""

    #Convert the last known webm file to wav
    

    #Send the wav file to the speech to text api
    transcription = ""
    transcription += transcribe(audiopath)

    #Default for if you have no class information
    if transcription == "":
        transcription = "Disgraceful child how dare you not be attending class, " \
        "you are a disgrace to the family. You are not my child. I am disowning you."\
        " You are no longer my child."

    #Send the transcription to the summarization api
    print("Sending to cohere")
    co = cohere.Client(os.getenv("COHERE_API_KEY"))
    buffer += co.summarize(text=transcription).summary

    #Return
    print(buffer)
    return HttpResponse(buffer)

