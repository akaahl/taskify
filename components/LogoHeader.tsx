import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";

export default function LogoHeader() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={Logo} alt="logo" />
        <p className="text-lg text-neutral-700 pb-1 font-bold pt-2">Taskify</p>
      </div>
    </Link>
  );
}
