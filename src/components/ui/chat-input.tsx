import { cn } from "../../lib/utils";
import React from "react";
import {
  PiFeatherFill,
  PiPaperPlaneRightFill,
  PiSpinnerBold,
} from "react-icons/pi";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  inputProps?: unknown;
  error?: string;
}

const ChatInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, inputProps, className, disabled, name, ...props }, ref) => {
    return (
      <section className={cn(className, "relative group  ")}>
        <input
          className={cn(
            "duration-50 rounded-sm p-1 px-8 w-full pr-14 h-10 peer     bg-dark-300   focus:outline-none     placeholder:text-sm placeholder:text-light-800   text-light-500 focus:shadow-inner ",
            className,
            error && "border-red-600 focus:border-red-500 "
          )}
          id={name}
          name={name}
          ref={ref}
          {...(inputProps ?? {})}
          {...props}
        />
        <strong className="absolute -translate-y-1/2 peer-focus:text-light-50  text-light-950 top-1/2 left-2 ">
          <PiFeatherFill />
        </strong>
        <Button
          disabled={disabled}
          variant={"transparent"}
          size={"small-square"}
          className="absolute -translate-y-1/2 text-light-950 disabled:cursor-not-allowed disabled:hover:text-light-950 hover:text-light-50 duration-75 transition-all  top-1/2 right-4  w-8 h-6 flex justify-center items-center cursor-pointer"
        >
          {disabled ? (
            <PiSpinnerBold className="w-5 h-5 animate-spin" />
          ) : (
            <PiPaperPlaneRightFill className="w-5 h-5" />
          )}
        </Button>
        {error ? (
          <span className="px-2 absolute w-full left-0 -bottom-4 text-error-500 text-xs font-normal">
            {error as string}
          </span>
        ) : null}
      </section>
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
