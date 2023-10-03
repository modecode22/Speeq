import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "duration-100 rounded  w-full h-12 peer focus:shadow-inner border  dark:border-dark-700 border-light-700  dark:focus:border-dark-300 focus:border-light-300  dark:bg-dark-950 bg-light-50  p-2 focus:outline-none focus:ring-1  dark:focus:ring-dark-400 focus:ring-light-950 placeholder:font-light placeholder:text-sm  dark:placeholder:text-dark-500 placeholder:text-dark-300 dark:focus:placeholder:text-dark-50 dark:text-light-950 text-dark-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
