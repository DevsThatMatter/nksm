"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/app/ui/icons";

export function Avatar() {
    const { setTheme } = useTheme();
    const handleLogout = () => {
        // Placeholder function for handling logout
        console.log("Logout clicked");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="icon">
                        <Icons.avatar className="h-[1.7rem] w-[1.7rem]" />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => console.log("View Your Profile")}>
                    View Your Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Settings")}>
                    Settings
                </DropdownMenuItem>
                <DropdownMenu>
                    <DropdownMenuItem>
                        <DropdownMenuTrigger>
                            Change Theme
                        </DropdownMenuTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuContent align="center">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
