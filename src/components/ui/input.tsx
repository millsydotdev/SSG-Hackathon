import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, startIcon, type = "text", ...props }, ref) => {
    return (
      <div className="relative">
        {startIcon && (
          <div className="left-sm text-on-surface-variant pointer-events-none absolute top-1/2 -translate-y-1/2">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "border-outline-variant px-md py-sm text-body-sm text-on-surface w-full rounded border bg-black transition-colors duration-150",
            "placeholder:text-on-surface-variant/50",
            "focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none",
            "caret-primary",
            startIcon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
