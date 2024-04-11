"use client";

import { useRouter } from "next/navigation";
import { Close, Content, Overlay, Portal, Root } from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { Button } from "./ui/button";
import { cn } from "../utils";

const dialogLocations = cva(
  "fixed inset-0 z-50 flex h-svh w-svw flex items-center",
  {
    variants: {
      location: {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
      },
    },
    defaultVariants: {
      location: "center",
    },
  },
);
interface DialogProps extends VariantProps<typeof dialogLocations> {
  disableClickOutside?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Dialog({
  disableClickOutside,
  className,
  children,
  location,
}: DialogProps) {
  const router = useRouter();

  return (
    <Root open onOpenChange={() => router.back()}>
      <Portal forceMount>
        <Overlay asChild>
          <div className="fixed inset-0 z-50 backdrop-blur-sm" />
        </Overlay>
        <div className={cn(dialogLocations({ location }))}>
          <Content
            asChild
            onPointerDownOutside={(e) => {
              if (disableClickOutside) e.preventDefault();
            }}
          >
            <div
              className={cn(
                "relative max-h-full w-full max-w-full bg-background p-6 shadow-lg sm:p-8",
                "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                location === "center" ? "sm:rounded-lg" : "h-full rounded-none",
                className,
              )}
            >
              {children}
            </div>
          </Content>
        </div>
      </Portal>
    </Root>
  );
}
const DialogCloseBtn = ({ className }: { className?: string }) => {
  return (
    <Close asChild>
      <Button
        className={cn(
          "bg-transparent text-foreground shadow-none hover:bg-transparent  disabled:pointer-events-none",
          className,
        )}
      >
        <Cross2Icon />
        <span className="sr-only">Close</span>
      </Button>
    </Close>
  );
};

export { Dialog, DialogCloseBtn, type DialogProps };
