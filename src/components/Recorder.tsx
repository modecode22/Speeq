import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { recordButtonVariants, svgVariants } from "../lib/animation-utils";
import AudioPlayer from "./AudioPlayer";

const Recorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(newAudioUrl);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      audioChunksRef.current = [];
      setIsRecording(false);
    }
  };


  

  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-5">
      <motion.button
        initial="stop"
        whileHover="hover"
        animate={isRecording ? "record" : "stop"}        variants={recordButtonVariants}
        className="flex flex-col items-center p-3 justify-evenly rounded-full"
        onClick={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
      >
        {isRecording ? (
          <>
            <motion.svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="3em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
              variants={svgVariants}
              initial="initial"
              whileHover="hover"

            >
              <motion.path
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
                strokeWidth={1}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H15V9H9Z"
              />
            </motion.svg>{" "}
            Stop
          </>
        ) : (
          <>
            <motion.svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="3em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
              variants={svgVariants}
              initial="initial"
              whileHover="hover"
            >
              <motion.path
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
                strokeWidth={1}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"
              ></motion.path>
            </motion.svg>{" "}
            Record
          </>
        )}
      </motion.button>
      {audioUrl && (
        <div className="flex flex-col items-center mt-2 w-full">
       <AudioPlayer isRecording={isRecording} src={audioUrl}/>
        </div>
      )}
    </section>
  );
};

export default Recorder;
