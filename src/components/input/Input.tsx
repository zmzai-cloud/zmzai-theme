"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { inputVariants, type InputVariant, type InputSize } from "./input.styles";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
}

/**
 * Input — text input field.
 *
 * - `default`: light border, focus turns border to ink
 * - `brutal`: 2px ink border + hard offset shadow, focus shifts (neobrutalism)
 *
 * @example
 * <Input placeholder="搜索…" />
 * <Input variant="brutal" placeholder="描述任务…" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
