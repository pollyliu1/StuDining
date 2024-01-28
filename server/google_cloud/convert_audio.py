from pydub import AudioSegment
import audioop

def convert_webm_to_wav():
    audio = AudioSegment.from_file("../audio.webm", format="webm")
    frame_rate = audio.frame_rate
    channels = audio.channels

    audio = audioop.lin2lin(audio.raw_data, audio.sample_width, 2)
    audio = AudioSegment(audio, frame_rate=frame_rate, channels=channels, sample_width=2)
    audio.export("/Users/graceliu/UofTHacksXI/server/test_out.wav", format="wav")

if __name__ == "__main__":
    convert_webm_to_wav()
