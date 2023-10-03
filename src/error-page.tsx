import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="overflow-hidden message-back min-h-screen w-full flex text-light-500 flex-col items-center justify-between gap-5"
    >
      <header
        className={`h-14 bg-dark-500 p-2 w-full  z-10 duration-75 transition-all border-dark-400 border-b flex items-center justify-between shadow-md shadow-dark-950`}
      >
        <div className="flex px-2 justify-between items-center w-full h-full">
          <section className="flex gap-2 items-center justify-center">
            <div className="rounded-full bg-dark-400 animate-pulse h-8 w-8"></div>
            <div className="rounded-full bg-dark-400 animate-pulse h-4 w-20"></div>
          </section>
          <section className="flex gap-2">
            <div className="rounded-full bg-dark-400 animate-pulse h-6 w-6"></div>
            <div className="rounded-full bg-dark-400 animate-pulse h-6 w-6"></div>
            <div className="rounded-full bg-dark-400 animate-pulse h-6 w-6"></div>
          </section>
        </div>
      </header>

      <section className="flex-grow flex flex-col items-center gap-2 py-3">
        <div className="bg-dark-800 animate-pulse w-20 h-20 rounded-full"></div>
        <div className="bg-dark-800 animate-pulse w-36 h-6 rounded-full"></div>
        <div className="bg-dark-800 animate-pulse w-56 h-6 rounded-full"></div>
      </section>

      <div className="px-5 absolute gap-2 bottom-0 w-full h-20  flex p-2 pb-4 flex-col justify-end bg-dark-500  border-dark-400 border-t">
        <div className="w-24 h-4 rounded-sm bg-dark-400 animate-pulse"></div>
        <div className="w-full h-8 rounded-sm bg-dark-400"></div>
      </div>
      {/* <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="p-5 max-w-sm flex-wrap overflow-hidden bg-dark-800 flex justify-center items-center rounded-md shadow-lg">{JSON.stringify(error)}</p> */}
    </div>
  );
}