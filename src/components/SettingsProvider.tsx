import React, { createContext, useState, useContext, useEffect } from "react";
import { getFromLocalStorage } from "../lib/utils";

// Settings Context Initialization
const SettingsContext = createContext<ContextType>({
  theme: "dark",
  updateTheme: () => {},
  fromLanguage: "English",
  updateFromLanguage: () => {},
  toLanguage: "English",
  updateToLanguage: () => {},
  outputDevice: undefined,
  updateOutputDevice: () => {},
  inputDevice: undefined,
  updateInputDevice: () => {},
  devices: [],
});

function handleAudioStream(stream: MediaStream, deviceId: string) {
  const audioElement = new Audio();
  audioElement.srcObject = stream;

  if (typeof (audioElement as any).sinkId !== "undefined") {
    (audioElement as any)
      .setSinkId(deviceId)
      .then(() => {
        audioElement.play();
      })
      .catch((err: unknown) => {
        console.error(
          "Error setting the audio output device:",
          JSON.stringify(err)
        );
      });
  } else {
    console.warn("Your browser does not support output device selection.");
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // States
  const [theme, setTheme] = useState<ThemeType>(
    getFromLocalStorage("theme", "dark")
  );
  const [fromLanguage, setFromLanguage] = useState<string>(
    getFromLocalStorage("fromlang", "English")
  );
  const [toLanguage, setToLanguage] = useState<string>(
    getFromLocalStorage("tolang", "English")
  );
  const [outputDevice, setOutputDevice] = useState<string | undefined>(
    getFromLocalStorage("outputdevice", undefined)
  );
  const [inputDevice, setInputDevice] = useState<string | undefined>(
    getFromLocalStorage("inputdevice", undefined)
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // Update and Store functions
  const updateAndStore = (
    key: string,
    value: any,
    updater: React.Dispatch<React.SetStateAction<any>>
  ) => {
    updater(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Effects
  useEffect(() => {
    // Update the DOM class based on theme
    const className = "dark";
    const htmlClass = document.documentElement.classList;
    theme === "dark" ? htmlClass.add(className) : htmlClass.remove(className);
  }, [theme]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (inputDevice) {
          handleAudioStream(stream, inputDevice);
        }
      })
      .catch((error) => console.error("Error accessing microphone.", error));

    // Enumerate devices if available
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.enumerateDevices === "function"
    ) {
      navigator.mediaDevices.enumerateDevices().then((allDevices) => {
        const audioDevices = allDevices.filter(
          (device) => device.kind === "audiooutput"
        );
        setDevices(audioDevices);

        if (!outputDevice && audioDevices.length > 0) {
          updateAndStore("device", audioDevices[0].deviceId, setOutputDevice);
        }
      });
    }
  }, [outputDevice, inputDevice]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        updateTheme: (value: ThemeType) =>
          updateAndStore("theme", value, setTheme),
        fromLanguage,
        updateFromLanguage: (value: string) =>
          updateAndStore("fromlang", value, setFromLanguage),
        toLanguage,
        updateToLanguage: (value: string) =>
          updateAndStore("tolang", value, setToLanguage),
        outputDevice,
        updateOutputDevice: (value: string) =>
          updateAndStore("outputdevice", value, setOutputDevice),
        inputDevice,
        updateInputDevice: (value: string) =>
          updateAndStore("inputdevice", value, setInputDevice),
        devices,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
