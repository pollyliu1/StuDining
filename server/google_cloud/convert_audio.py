from pydub import AudioSegment
import audioop

def convert_webm_to_wav(webm_filepath, output_filepath):
    audio = AudioSegment.from_file(webm_filepath, format="webm")
    frame_rate = audio.frame_rate
    channels = audio.channels

    audio = audioop.lin2lin(audio.raw_data, audio.sample_width, 2)
    audio = AudioSegment(audio, frame_rate=frame_rate, channels=channels, sample_width=2)
    audio.export(output_filepath, format="wav")

if __name__ == "__main__":
    convert_webm_to_wav()
