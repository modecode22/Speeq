import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "duration-100 rounded  w-full h-12 peer focus:shadow-inner dark:border  border-dark-700  focus:border-dark-300  bg-dark-950  p-2 focus:outline-none focus:ring-1  focus:ring-dark-400 placeholder:font-light placeholder:text-sm  placeholder:text-dark-500 focus:placeholder:text-dark-100 text-light-950 ",
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
