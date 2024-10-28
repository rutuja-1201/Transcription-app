import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const MicrophoneButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(event.data);
        }
      };

      wsRef.current = new WebSocket(`wss://api.deepgram.com/v1/listen?access_token=${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`);

      wsRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      wsRef.current.onopen = () => {
        console.log('Connected to Deepgram WebSocket');
        mediaRecorder.start();
        setIsRecording(true);
      };

      wsRef.current.onmessage = (message) => {
        const receivedData = JSON.parse(message.data);
        if (receivedData && receivedData.channel && receivedData.channel.alternatives[0].transcript) {
          setTranscription(receivedData.channel.alternatives[0].transcript);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <button
          className={`btn btn-${isRecording ? 'danger' : 'primary'} btn-lg`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-primary">Transcription:</h3>
        <div className="alert alert-info">
          <p className="mb-0">
            {transcription || 'Transcription will appear here...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MicrophoneButton;
