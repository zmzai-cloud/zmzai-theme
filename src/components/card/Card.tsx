"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";
import { cardVariants, type CardVariant, type CardPadding } from "./card.styles";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Enable framer-motion hover lift (for interactive cards) */
  animatedHover?: boolean;
}

/**
 * Card — surface container.
 *
 * - `default`: static white card with light border
 * - `interactive`: hover border darkens + shadow + lift (via framer-motion if animatedHover)
 * - `surface`: slightly grey background for nested panels
 *
 * @example
 * <Card padding="lg">内容</Card>
 * <Card variant="interactive" animatedHover>可点击卡片</Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, animatedHover, children, ...props }, ref) => {
    const shouldAnimate = variant === "interactive" && animatedHover;

    const MotionDiv = motion.div;

    return (
      <MotionDiv
        ref={ref}
        whileHover={
          shouldAnimate
            ? { y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
            : undefined
        }
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

Card.displayName = "Card";

/**
 * Card.Header — top section of a card (often with title + actions).
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between border-b border-line px-4 py-3", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * Card.Body — main content area.
 */
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 py-3", className)} {...props} />
  )
);
CardBody.displayName = "CardBody";

/**
 * Card.Footer — bottom section.
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 border-t border-line px-4 py-3", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
