import Image from "next/image";
interface HeaderProps {
    headerLabel: string
}

export default function Header({ headerLabel }: HeaderProps) {
    return (
        <div className="w-full flex flex-col gap-y-2 items-center" >
            <Image
                src="logon.svg"
                alt="Logo"
                width={150}
                height={150}
                className="dark:invert"
            />
            <p className="text-muted-foreground text-sm text-center">{headerLabel}</p>
        </div>
    )
}