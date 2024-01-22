import { ModeToggle } from "@/app/ui/theme/mode-toggle";
import UserChat from "@/components/Chat/UserChat";

const Navbar = () => {
  return (
    //  these classnames can be removed, just added to check
    <div className="flex justify-between m-10">
      <ModeToggle />
      <UserChat/>
    </div>
  );
};

export default Navbar;
