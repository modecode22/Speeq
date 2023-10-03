import { cn } from "../../lib/utils";
import React from "react"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <section className={cn(className, "relative group ")}>
        <input
          className={cn(
            "duration-100 rounded  w-full h-12 peer focus:shadow-inner border  dark:border-dark-700 border-light-700  dark:focus:border-dark-300 focus:border-light-300  dark:bg-dark-950 bg-light-50  p-2 focus:outline-none focus:ring-1  dark:focus:ring-dark-400 focus:ring-light-950 placeholder:font-light placeholder:text-sm  dark:placeholder:text-dark-500 placeholder:text-dark-300 dark:focus:placeholder:text-dark-50 dark:text-light-950 text-dark-900 ",
            className,
            error && "border-red-600 focus:border-red-500 "
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <span className="px-2 text-error-600 text-xs font-normal">
            {error as string}
          </span>
        ) : null}
      </section>
    );
  }
)
Input.displayName = "Input"

export { Input }
