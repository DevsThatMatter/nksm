import Image from "next/image";
interface HeaderProps {
  headerLabel: string;
}

export default function Header({ headerLabel }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <Image
        src="/logon.svg"
        alt="Logo"
        width={150}
        height={150}
        className="dark:invert"
      />
      <p className="text-center text-sm text-muted-foreground">{headerLabel}</p>
    </div>
  );
}
