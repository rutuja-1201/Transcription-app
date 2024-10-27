"use client";
import React, { useState } from "react";
import MicrophoneButton from "../components/Microphonebutton";
import TranscriptionDisplay from "../components/TranscriptionDisplay";

const HomePage: React.FC = () => {
  const [transcription, setTranscription] = useState("");

  return (
    <div>
      <MicrophoneButton />
      <TranscriptionDisplay transcription={transcription} />
    </div>
  );
};

export default HomePage;
