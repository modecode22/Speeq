import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import AudioRecorder from "./components/AudioRecorder";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="h-screen bg-dark-800 text-light-500">
<AudioRecorder />   
 </div>
  );
}

export default App;
