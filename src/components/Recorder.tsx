import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {  svgVariants } from "../lib/animation-utils";
import AudioPlayer from "./AudioPlayer";
import Tooltip from "./ui/tooltip";
import Orb from "./Orb";
import { client } from "@gradio/client";
import { urlToBlob } from "../lib/utils";
import { ImSpinner2 } from 'react-icons/im'
import { useSettings } from "./SettingsProvider";
const Recorder: React.FC = () => {
  const {fromLanguage,toLanguage } =useSettings()
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startRecording = async () => {
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current = [...audioChunksRef.current, event.data];
      }
    };

    mediaRecorder.onstop = async () => {
      if (audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
        await sendAudioToGradio(newAudioUrl);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRecordButtonClick = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      startRecording();
    }
  };
  const sendAudioToGradio = async (audioURL: string) => {
    try {
      setIsLoading(true);

      if (!audioURL) {
        throw new Error("Invalid audio URL.");
      }

      const audioBlob = await urlToBlob(audioURL);
      const app = await client("https://facebook-seamless-m4t.hf.space/", {});
      const result = await app.predict("/run", [
        "S2ST (Speech to Speech translation)",
        "file",
        audioBlob,
        audioBlob,
        "Howdy!",
        fromLanguage,
        toLanguage
      ]) as GradioResponse;

      if (!result || !result.data || !result.data[0] || !result.data[0].data) {
        throw new Error("Invalid response from Gradio.");
      }

      setAudioUrl(result.data[0].data);

    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-5">
      <Tooltip direction="bottom" name={isLoading?"loading...":isRecording ? "Stop" : "Record"}>
        <motion.button
          className=" flex flex-col items-center  justify-evenly rounded-full"
          onClick={handleRecordButtonClick}
disabled={isLoading}
        >
          <Orb color={isLoading?"loading":isRecording ? "recording" : "primary"} >
          
          {isLoading ? <ImSpinner2 className='animate-spin w-8 h-8' />   : isRecording ? <motion.svg
               stroke="currentColor"
               fill="currentColor"
               strokeWidth="0"
               viewBox="0 0 24 24"
               height="4em"
               width="4em"
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
                 className={' fill-alert-900 stroke-light-50 '}
                 initial={{ pathLength: 0 ,fill:"none"}}
                 animate={{ pathLength: 1 }}
                 d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"
               />
             </motion.svg>  :
               <motion.svg
               stroke="currentColor"
               fill="currentColor"
               strokeWidth="0"
               viewBox="0 0 24 24"
               height="4em"
               width="4em"
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
                 className={' fill-primary-900 stroke-light-50 '}
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 2 }}
                 d="M16.9337 8.96494C16.426 5.03562 13.0675 2 9 2 4.58172 2 1 5.58172 1 10 1 11.8924 1.65707 13.6313 2.7555 15.0011 3.56351 16.0087 4.00033 17.1252 4.00025 18.3061L4 22H13L13.001 19H15C16.1046 19 17 18.1046 17 17V14.071L18.9593 13.2317C19.3025 13.0847 19.3324 12.7367 19.1842 12.5037L16.9337 8.96494ZM3 10C3 6.68629 5.68629 4 9 4 12.0243 4 14.5665 6.25141 14.9501 9.22118L15.0072 9.66262 16.5497 12.0881 15 12.7519V17H11.0017L11.0007 20H6.00013L6.00025 18.3063C6.00036 16.6672 5.40965 15.114 4.31578 13.7499 3.46818 12.6929 3 11.3849 3 10ZM21.1535 18.1024 19.4893 16.9929C20.4436 15.5642 21 13.8471 21 12.0001 21 10.153 20.4436 8.4359 19.4893 7.00722L21.1535 5.89771C22.32 7.64386 23 9.74254 23 12.0001 23 14.2576 22.32 16.3562 21.1535 18.1024Z"
               />
             </motion.svg> }
          
     


          </Orb>
        </motion.button>
      </Tooltip>
      {audioUrl && (
        <div className="flex flex-col items-center mt-2 w-full">
          <AudioPlayer  isLoading={isLoading} src={audioUrl} />
        </div>
      )}

    </section>
  );
};

export default Recorder;
// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "./ui/button";
// import { motion } from "framer-motion";
// import { recordButtonVariants, svgVariants } from "../lib/animation-utils";
// import AudioPlayer from "./AudioPlayer";
// import Tooltip from "./ui/tooltip";
// import Orb from "./Orb";

// const Recorder: React.FC = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         audioChunksRef.current.push(event.data);
//       }
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//       const newAudioUrl = URL.createObjectURL(audioBlob);
//       setAudioUrl(newAudioUrl);
//     };

//     mediaRecorderRef.current.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       audioChunksRef.current = [];
//       setIsRecording(false);
//     }
//   };

//   return (
//     <section className="h-full w-full flex justify-center items-center flex-col gap-5">

//      <Tooltip direction="bottom" name={isRecording ? "record" : "stop"} >

//       <motion.button
//         initial="stop"
//         whileHover="hover"
//         animate={isRecording ? "record" : "stop"}        variants={recordButtonVariants}
//         className="flex flex-col items-center p-3 justify-evenly rounded-full"
//         onClick={() => {
//           if (isRecording) {
//             stopRecording();
//           } else {
//             startRecording();
//           }
//         }}
//       >
//         {isRecording ? (
//           <>

//             <motion.svg
//               stroke="currentColor"
//               fill="currentColor"
//               strokeWidth="0"
//               viewBox="0 0 24 24"
//               height="3em"
//               width="3em"
//               xmlns="http://www.w3.org/2000/svg"
//               variants={svgVariants}
//               initial="initial"
//               whileHover="hover"

//             >
//               <motion.path
//                 transition={{
//                   duration: 2,
//                   ease: "easeInOut",
//                 }}
//                 strokeWidth={1}
//                 fill="none"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H15V9H9Z"
//               />
//             </motion.svg>{" "}
//             Stop
//           </>
//         ) : (
//           <>

//     <motion.svg
//       stroke="currentColor"
//       fill="currentColor"
//       strokeWidth="0"
//       viewBox="0 0 512 512"
//       height="3em"
//       width="3em"
//       xmlns="http://www.w3.org/2000/svg"
//       variants={svgVariants}
//       initial="initial"
//       whileHover="hover"
//     >
//       <motion.path
//         transition={{
//           duration: 2,
//           ease: "easeInOut"
//         }}
//         strokeWidth={1}
//         fill="none"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         d="M468.53 236.03H486v39.94h-17.47v-39.94zm-34.426 51.634h17.47v-63.328h-17.47v63.328zm-33.848 32.756h17.47V191.58h-17.47v128.84zm-32.177 25.276h17.47V167.483h-17.47v178.17zm-34.448-43.521h17.47v-92.35h-17.47v92.35zm-34.994 69.879h17.47v-236.06h-17.525v236.06zM264.2 405.9h17.47V106.1H264.2V405.9zm-33.848-46.284h17.47V152.383h-17.47v207.234zm-35.016-58.85h17.47v-87.35h-17.47v87.35zm-33.847-20.823h17.47V231.98h-17.47v48.042zm-33.848 25.66h17.47v-99.24h-17.47v99.272zm-33.302 48.04h17.47V152.678H94.34v201zm-33.847-30.702h17.47V187.333h-17.47v135.642zM26 287.664h17.47v-63.328H26v63.328z"
//       />
//     </motion.svg>
//             {/* <motion.svg
//               stroke="currentColor"
//               fill="currentColor"
//               strokeWidth="0"
//               viewBox="0 0 24 24"
//               height="3em"
//               width="3em"
//               xmlns="http://www.w3.org/2000/svg"
//               variants={svgVariants}
//               initial="initial"
//               whileHover="hover"
//             >
//               <motion.path
//                 transition={{
//                   duration: 2,
//                   ease: "easeInOut",
//                 }}
//                 strokeWidth={1}
//                 fill="none"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"
//               ></motion.path>
//             </motion.svg>{" "} */}
//             Record
//           </>
//         )}
//       </motion.button>
//      </Tooltip>
//       {audioUrl && (
//         <div className="flex flex-col items-center mt-2 w-full">
//        <AudioPlayer isRecording={isRecording} src={audioUrl}/>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Recorder;
