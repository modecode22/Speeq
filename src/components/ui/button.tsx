import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { PiSpinner } from "react-icons/pi";
import { cn } from "../../lib/utils";

//  change the themes of the bottons
export const buttonVariants = cva(
  "group flex justify-center items-center  gap-2  h-fit  duration-75  transition-all duration-75  select-none  rounded",
  {
    variants: {
      variant: {
        // Primary
        "primary-solid":
          "dark:bg-primary-500 dark:hover:bg-primary-400 hover:bg-primary-500 bg-primary-600 dark:active:text-dark-900 shadow-sm     dark:text-dark-800 active:text-light-50 text-light-100  ",
        "primary-outline":
          " border-2 border-primary-500 hover:border-primary-400       text-primary-400 active:text-primary-500",
        "primary-ghost":
          "text-primary-600 hover:text-priamry-800 dark:hover:bg-primary-950 hover:bg-primary-50",
        // Transparent
        "transparent": "dark:hover:text-light-500 text-dark-500 hover:text-dark-700 dark:text-light-800",

        // Light
        "light-solid": "bg-light-500 hover:bg-light-400 active:text-dark-900 shadow-sm text-dark-800 ",
        "light-outline": "border-2 border-light-500 hover:border-light-400 dark:text-light-400 dark:active:text-light-500 text-dark-500 active:text-dark-950",
        "light-ghost": "dark:text-light-600 dark:hover:text-light-800 dark:hover:bg-dark-700 hover:bg-light-900 ",
        // Dark
        "dark-solid": "bg-dark-500 hover:bg-dark-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "dark-outline": "border-2 border-dark-500 hover:border-dark-400 text-dark-400 active:text-dark-500",
        "dark-ghost": "text-dark-600  dark:hover:bg-dark-950 hover:bg-dark-50",
        // Error
        "error-solid": "bg-error-500 hover:bg-error-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "error-outline": "border-2 border-error-500 hover:border-error-400 text-error-400 active:text-error-500",
        "error-ghost": "text-error-600  dark:hover:bg-error-950 hover:bg-error-50",
        
        // Alert
        "alert-solid": "bg-alert-500 hover:bg-alert-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "alert-outline": "border-2 border-alert-500 hover:border-alert-400 dark:text-alert-400 text-alert-600 active:text-alert-500",
        "alert-ghost": "text-alert-600  dark:hover:bg-alert-950 hover:bg-alert-50",
        
        // Success
        "success-solid": "bg-success-500 hover:bg-success-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "success-outline": "border-2 border-success-500 hover:border-success-400 text-success-400 active:text-success-500",
        "success-ghost": "text-success-600  dark:hover:bg-success-950 hover:bg-success-50",
        
        // Info
        "info-solid": "bg-info-500 hover:bg-info-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "info-outline": "border-2 border-info-500 hover:border-info-400 text-info-400 active:text-info-500",
        "info-ghost": "text-info-600  hover:bg-info-50 dark:hover:bg-info-950",
        
        // Happy
        "happy-solid": "bg-happy-500 hover:bg-happy-400 dark:active:text-dark-900 shadow-sm dark:text-dark-800 active:text-light-50 text-light-100",
        "happy-outline": "border-2 border-happy-500 hover:border-happy-400 text-happy-400 active:text-happy-500",
        "happy-ghost": "text-happy-600 dark:hover:bg-happy-950 hover:bg-happy-50",
            },

      size: {
        "tiny-default": "h-6 px-1 gap-1 caption-strong min-w-[64px] ",
        "tiny-square": "h-6 w-6  p-0",
        "small-default": "h-8 px-2 gap-1 caption-strong min-w-[70px]",
        "small-square": "h-8 w-8  p-0",
        "medium-default": "h-10 px-2 gap-2 callout min-w-[84px]",
        "medium-square": "h-10 w-10  p-0",
        "large-default": "h-11 px-3 gap-2 callout min-w-[84px]",
        "large-square": "h-11 w-11 p-0",
      },
      font: {
        default: "font-normal",
        bold: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "transparent",
      size: "medium-default",
      font: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={` ${cn("", buttonVariants({ variant, size }), className)}`}
        disabled={isLoading}
        {...props}
      >
        {children}
        {isLoading ? <PiSpinner className=" w-4 h-4 animate-spin " /> : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants as buttonVariant };
