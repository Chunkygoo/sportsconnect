import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/home">
      <span className="flex items-center">
        <Image
          width={40}
          height={40}
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold">
          SportsConnect
        </span>
      </span>
    </Link>
  );
}
