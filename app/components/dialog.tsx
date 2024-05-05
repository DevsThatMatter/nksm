"use client";

import { Close, Content, Overlay, Portal, Root } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import { Cross2Icon } from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../utils";
import { Button } from "./ui/button";

const dialogLocations = cva(
  "fixed inset-0 z-50 flex h-svh w-svw items-center",
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
const contentVariants = cva(
  "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      location: {
        start:
          "h-full rounded-none ease-in-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        end: "h-full rounded-none ease-in-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        center:
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
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
    <Root defaultOpen onOpenChange={() => setTimeout(() => router.back(), 140)}>
      <Portal forceMount>
        <Overlay asChild>
          <div
            className={cn(
              "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              location === "center" && "backdrop-blur-sm",
              location !== "center" && "bg-black/80",
            )}
          />
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
                "relative max-h-full w-full max-w-full bg-background shadow-lg",
                location === "center" && "p-6 sm:p-8",
                contentVariants({ location }),
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
