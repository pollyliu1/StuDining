import io
import os
import wave 
from google.cloud import storage, speech
from google.oauth2 import service_account
from dotenv import load_dotenv

# Load environment variables from .env file (if you're using one)
load_dotenv()

# used to extract header information from the audio file
def get_wav_properties(wav_file_path):
    with wave.open(wav_file_path, 'rb') as wav_file:
        sample_rate = wav_file.getframerate()
        sample_width = wav_file.getsampwidth()
        num_channels = wav_file.getnchannels()
        return sample_rate, sample_width, num_channels

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client(credentials=credentials)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)

    print(f"File {source_file_name} uploaded to {destination_blob_name}.")


# Construct the credentials JSON
credentials_json = {
  "type": "service_account",
  "project_id": "vaulted-timing-412501",
  "private_key_id": os.getenv("PRIVATE_KEY_ID"),
  "private_key": os.getenv("PRIVATE_KEY").replace('\\n', '\n'),
  "client_email": "grace-liu@vaulted-timing-412501.iam.gserviceaccount.com",
  "client_id": "108680015612408162352",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/grace-liu%40vaulted-timing-412501.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

# Create credentials from the dictionary
credentials = service_account.Credentials.from_service_account_info(credentials_json)

# Set your GCS bucket name and local file path
bucket_name = 'uofthacks11'
source_file_name = '/Users/graceliu/Downloads/female.wav'

# Extract file name from source file path and construct destination blob name
file_name = os.path.basename(source_file_name)
destination_blob_name = f"audio-files/{file_name}"

# Upload the WAV file to GCS
upload_blob(bucket_name, source_file_name, destination_blob_name)

# Speech Client
client = speech.SpeechClient(credentials=credentials)

# Use the GCS URI of the uploaded file
gcs_uri = f"gs://{bucket_name}/{destination_blob_name}"

# Dynamically determine sample rate and encoding
sample_rate, sample_width, _ = get_wav_properties(source_file_name)
if sample_width == 2:
    encoding = speech.RecognitionConfig.AudioEncoding.LINEAR16
else:
    raise ValueError(f"Unsupported sample width: {sample_width}")

config = speech.RecognitionConfig(
    encoding=encoding,
    sample_rate_hertz=sample_rate,
    language_code="en-US"
)
audio = speech.RecognitionAudio(uri=gcs_uri)
operation = client.long_running_recognize(config=config, audio=audio)

print("Waiting for operation to complete...")
response = operation.result(timeout=90)
for result in response.results:
    print(result.alternatives[0].transcript)
