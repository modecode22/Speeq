import { cn } from "../../lib/utils";
import React, { useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"




export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ error, className, name, ...props }, ref) => {
      const [show, setShow] = useState(false)
    return (
      <section className="relative group ">
        <div className="relative">
          <input
            className={cn(
            "duration-100 rounded  w-full h-12 peer focus:shadow-inner border  dark:border-dark-700 border-light-700  dark:focus:border-dark-300 focus:border-light-300  dark:bg-dark-950 bg-light-50  p-2 focus:outline-none focus:ring-1  dark:focus:ring-dark-400 focus:ring-light-950 placeholder:font-light placeholder:text-sm  dark:placeholder:text-dark-500 placeholder:text-dark-300 dark:focus:placeholder:text-dark-50 dark:text-light-950 text-dark-900 ",
              className,
              error &&
                "border-error-600 focus:border-error-500 focus:ring-error-600"
            )}
            type={show ? "text" : "password"}
            ref={ref}
            id={name}
            {...props}
          />
          <label
            htmlFor={name}
            onClick={() => {
              setShow(!show);
            }}
            className="absolute  right-4 top-1/2 -translate-y-1/2"
          >
            {show ? (
              <BsEye className="w-5 h-5 text-dark-200 duration-75 transition-colors " />
            ) : (
              <BsEyeSlash className="w-5 h-5  text-dark-300 duration-75 transition-colors" />
            )}
          </label>
        </div>
        {error ? (
          <span className="px-2 text-error-600 text-xs font-normal">
            {error as string}
          </span>
        ) : null}
      </section>
    );
  }
)
PasswordInput.displayName = "Input"

export { PasswordInput }
