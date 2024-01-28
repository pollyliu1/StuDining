# import moviepy.editor as moviepy
from pydub import AudioSegment

def convert_webm_to_wav():
    audio = AudioSegment.from_file("../audio.webm", format="webm")
    # audio = AudioSegment.from_file("/Users/graceliu/Downloads/big-buck-bunny_trailer.webm", format="webm")
    audio.export("/Users/graceliu/UofTHacksXI/server/test_out.wav", format="wav")

if __name__ == "__main__":
    convert_webm_to_wav()
