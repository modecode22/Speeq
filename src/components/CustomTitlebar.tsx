import { LuMaximize } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { HiMiniMinus } from "react-icons/hi2";
import { useCallback } from "react";
const CustomTitlebar = () => {
  const minimizeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/api/window");
    await appWindow?.minimize();
  }, []);

  const maximizeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/api/window");
    const isMaximized = await appWindow?.isMaximized();

    if (isMaximized) {
      appWindow?.unmaximize();
    } else {
      appWindow?.maximize();
    }
  }, []);

  const closeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/api/window");
    appWindow.close();
  }, []);

  return (
    <header className="fixed flex z-[999] justify-between h-8 w-full inset-0 bg-light-50 shadow-sm dark:bg-dark-950">
      <section className="h-full flex items-center  px-2 select-none ">
        <img src={"/logo.svg"} alt="logo" className="w-8" />
        <strong className=" font-semibold">SPEEQ</strong>
      </section>
      <section data-tauri-drag-region className="flex-grow"></section>

      <section className="w-28 flex items-center justify-center gap-2 px-2 ">
        <button
          className="w-7 h-7 flex justify-center items-center hover:bg-light-50 dark:hover:bg-dark-800 rounded-lg duration-75 transition-all"
          onClick={minimizeWindow}
        >
          <HiMiniMinus />
        </button>
        <button
          className="w-7 h-7 flex justify-center items-center hover:bg-light-50 dark:hover:bg-dark-800 rounded-lg duration-75 transition-all"
          onClick={maximizeWindow}
        >
          <LuMaximize />
        </button>
        <button
          className="w-7 h-7 flex justify-center items-center hover:bg-light-50 dark:hover:bg-dark-800 rounded-lg duration-75 transition-all"
          onClick={closeWindow}
        >
          <MdClose />
        </button>
      </section>
    </header>
  );
};

export default CustomTitlebar;
