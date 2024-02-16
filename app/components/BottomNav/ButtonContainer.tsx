import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/app/components/ui/button";

const divVariants = cva("relative grow z-10  flex place-items-center", {
  variants: {
    variant: {
      left: "rounded-l-lg",
      right: "rounded-r-lg",
    },
    size: {
      default: "justify-around",
      three: "grid-cols-3",
    },
  },
});
export interface DivProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof divVariants> {
  children: React.ReactNode;
}
const BottomContainer = forwardRef<HTMLDivElement, DivProps>(
  (
    { className, variant = "left", size = "default", children, ...props },
    ref
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
  }
);
BottomContainer.displayName = "BottomContainer";
export default BottomContainer;
