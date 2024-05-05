import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ReactNode } from "react";
import DialogOptions from "./DialogOptions";

const ClientDiv = ({ children, id }: { children: ReactNode; id: string }) => {
  return (
    <div className="relative">
      {children}
      <div className="max-sm:hidden">
        <DialogOptions id={id} />
      </div>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute bottom-5 right-2">
            <BsThreeDotsVertical size={28} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center text-center">
            <DialogOptions id={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ClientDiv;
