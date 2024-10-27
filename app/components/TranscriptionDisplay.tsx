import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
}


const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ transcription }) => (
  <div className="transcription-box">
    <p>{transcription || "Start speaking to see transcription here..."}</p>
  </div>
);

export default TranscriptionDisplay;
