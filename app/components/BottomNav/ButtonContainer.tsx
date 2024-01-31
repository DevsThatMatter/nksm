import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/app/components/ui/button";

const divVariants = cva(
  "relative grow z-10 bg-[#f7f7f78c] dark:bg-[#1f1f1f8c] grid place-items-center backdrop-blur-md",
  {
    variants: {
      variant: {
        left: "rounded-l-lg rounded-tr-[1.3rem] ",
        right: "rounded-r-lg rounded-tl-[1.3rem] ",
      },
      size: {
        default: "grid-cols-2",
        three: "grid-cols-3",
      },
    },
  },
);
export interface DivProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof divVariants> {
  children: React.ReactNode;
}
const BottomContainer = forwardRef<HTMLDivElement, DivProps>(
  (
    { className, variant = "left", size = "default", children, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(divVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
BottomContainer.displayName = "BottomContainer";
export default BottomContainer;
