import { useState } from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react"
import { cn } from "../../lib/utils";

interface ToolTipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  name: string
  direction: "right" | "left" | "top" | "bottom"
  tooltipClassName?: string
}

export default function Tooltip({ name, children, direction, className,tooltipClassName }: ToolTipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: direction,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  })

  // Event listeners to change the open state
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" })

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      <div className={cn(className)} ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            className={cn( " dark:bg-white bg-dark-950 text-light-50 dark:text-dark-950 rounded px-2", tooltipClassName)}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {name}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}
