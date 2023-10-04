import { RiAsterisk,RiCloseLine } from "react-icons/ri";
import { Link, useRouteError } from "react-router-dom";
import { useCallback } from "react";

export default function ErrorPage() {
const closeWindow = useCallback(async () => {
const { appWindow } = await import("@tauri-apps/api/window");
appWindow.close();
}, []);
  const error = useRouteError();
  console.error(error);

let message = null
if (error !== undefined && error !== null ) {
     message = `Sorry, an unexpected error has occurred ${JSON.stringify(error)}  .`
  }

  return (
    <div
    data-tauri-drag-region
      id="error-page"
      className="select-none overflow-hidden bg-dark-950 message-back min-h-screen w-full flex text-primary-500 flex-col items-center justify-center gap-5"
    >
  
    <button
      className="w-7 h-7 fixed top-3 right-3 flex justify-center items-center hover:bg-dark-800  rounded-lg duration-75 transition-all"
      onClick={closeWindow}
    >
      <RiCloseLine className='w-7 h-7 text-error-500' />
    </button>
    <h1 className="text-6xl">Error</h1>
  <p>{message}</p>
    <RiAsterisk  className='w-28 h-28 animate-slow-spin'  />
    <div className="text-light-500">
      Go <Link to="/" className="text-primary-500">Home</Link> 
    </div>
      {/* <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="p-5 max-w-sm flex-wrap overflow-hidden bg-dark-800 flex justify-center items-center rounded-md shadow-lg">{JSON.stringify(error)}</p> */}
    </div>
  );
}