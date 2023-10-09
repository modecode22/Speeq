import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-bar";
import { Toaster } from "../components/ui/toaster";
import CustomTitlebar from "../components/CustomTitlebar";






 function Root() {

   return (
       <main className="relative w-full  dark:bg-dark-900 bg-light-100 text-dark-800  dark:text-light-50  h-screen max-h-screen flex flex-col  ">
              <CustomTitlebar />

           <ScrollArea className="message-back w-full h-full mt-8 flex justify-center items-center flex-col gap-5 flex-grow ">
             <Outlet />
           </ScrollArea>
         <Toaster />
       </main>
   );
 }
export default React.memo(Root);