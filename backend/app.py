from flask import Flask, request, jsonify
from models.tacotron2 import Tacotron2
from models.wavenet import WaveNet
from utils.preprocess import preprocess_audio
from utils.postprocess import postprocess_audio

app = Flask(__name__)

# Load models
tacotron2 = Tacotron2()
wavenet = WaveNet()

@app.route('/upload', methods=['POST'])
def upload_audio():
    # Handle audio file upload and preprocessing
    file = request.files['audio']
    language = request.form['language']
    audio_data = preprocess_audio(file)
    # Save audio data and language preference
    return jsonify({"message": "Audio uploaded successfully"})

@app.route('/generate', methods=['POST'])
def generate_speech():
    # Handle text-to-speech generation
    text = request.json['text']
    language = request.json['language']
    pitch = request.json['pitch']
    speed = request.json['speed']
    tone = request.json['tone']
    
    # Generate mel-spectrogram from text
    mel_spectrogram = tacotron2.generate_mel_spectrogram(text, language)
    # Generate audio from mel-spectrogram
    audio = wavenet.generate_audio(mel_spectrogram, pitch, speed, tone)
    # Post-process the generated audio
    audio = postprocess_audio(audio)
    
    return jsonify({"audio": audio})

if __name__ == '__main__':
    app.run(debug=True)