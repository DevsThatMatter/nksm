import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import { cva } from "class-variance-authority";

const NavButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      title="home"
      variant="ghost"
      size="icon"
      className="active:-translate-y-1 transition
                        hover:text-purple-500"
    >
      {children}
    </Button>
  );
};

export default NavButton;
