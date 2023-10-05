import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiDownload2Fill, RiPlayFill, RiSendPlaneFill, RiStopFill } from "react-icons/ri";
import Tooltip from "./ui/tooltip";

type AudioPlayerProps = {
  src: string;
  isRecording: boolean;
};

const AudioPlayer = ({ src, isRecording }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleAudioEnd = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, []);
  return (
    <div className="w-full">
      <audio ref={audioRef} src={src}>
        Your browser does not support the audio element.
      </audio>

      {!isRecording && (
        <motion.div
          className="w-full"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <section className="p-4 bg-white dark:bg-dark-950 shadow rounded">
            {" "}
            <div className="my-2">
              <div className="bg-gray-300 h-2 rounded-full">
                <motion.div
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "anticipate", duration: 0.1 }}
                ></motion.div>
              </div>
            </div>
            <section className="w-full flex items-center justify-between">
              <div className="flex space-x-2">
                <AnimatePresence>
                  {isPlaying ? (
                    <Tooltip direction="bottom" name="Stop">
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-error-500 p-2 text-light-50 rounded h-8 flex justify-center items-center hover:bg-error-400"
                        onClick={() => setIsPlaying(false)}
                      >
                        <RiStopFill />
                      </motion.button>
                    </Tooltip>
                  ) : (
                    <Tooltip direction="bottom" name="Play">
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-happy-500 p-2 text-light-50 rounded h-8 flex justify-center items-center hover:bg-happy-400"
                        onClick={() => setIsPlaying(true)}
                      >
                        <RiPlayFill />
                      </motion.button>
                    </Tooltip>
                  )}

                  <Tooltip direction="bottom" name="Download">
                    <a
                      href={src}
                      download
                      className="bg-happy-500 p-2 text-light-50 rounded  flex justify-center items-center h-8 w-8 hover:bg-happy-400 "
                    >
                      <RiDownload2Fill />
                    </a>
                  </Tooltip>
                </AnimatePresence>
              </div>
              <Tooltip direction="bottom" name="Send">
                <a
                  href={src}
                  download
                  className="bg-happy-500 p-2 text-light-50 rounded  flex justify-center items-center h-8 w-8 hover:bg-happy-400 "
                >
                  <RiSendPlaneFill />
                </a>
              </Tooltip>
            </section>
          </section>
        </motion.div>
      )}
    </div>
  );
};

export default AudioPlayer;
