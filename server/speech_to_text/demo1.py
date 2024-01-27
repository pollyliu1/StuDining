import io
from google.oauth2 import service_account
from google.cloud import speech

client_file = 'speech_demo_key'
credentials = service_account.Credentials.from_service_account_file(client_file + '.json')
client = speech.SpeechClient(credentials=credentials)

# load the audio file
audio_file = 'sports.wav'
with io.open(audio_file, "rb") as f:
    content = f.read()
    audio = speech.RecognitionAudio(content=content)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=48000,
    language_code="en-US",
    model='video'
)

response = client.recognize(config=config, audio=audio)

# things to do with the output 

# print(response)
print(response.results[0].alternatives[0].transcript)

for result in response.results:
    print(result.alternatives[0].transcript)
