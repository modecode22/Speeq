import React, { useState, useRef, useEffect } from 'react';

const Recorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);  // <--- Add this line
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceDetectionCounterRef = useRef<number>(0);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(512, 1, 1);
  
  source.connect(processor);
  processor.connect(audioContext.destination);
    processor.onaudioprocess = function(event) {
      const inputData = event.inputBuffer.getChannelData(0);
      const total = inputData.length;
      let sum = 0;
      
      // Calculate the RMS (root mean square) to determine silence
      for (let i = 0; i < total; i++) {
        sum += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sum / total);
      
      if (rms < 0.01) {  // Adjust threshold as needed
        silenceDetectionCounterRef.current += 1;
        if (silenceDetectionCounterRef.current > 20) {  // Adjust duration as needed
          stopRecording();
        }
      } else {
        silenceDetectionCounterRef.current = 0;
      }
    };

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      processor.disconnect();
      audioContext.close();
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };



  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>   {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
};

export default Recorder;