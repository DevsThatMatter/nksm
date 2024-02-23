import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/utils";

const NavButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      title="home"
      variant="ghost"
      size="icon"
      className={cn(
        "transition hover:text-purple-500 active:-translate-y-1",
        className,
      )}
    >
      {children}
    </Button>
  );
};

export default NavButton;
