import Image from "next/image";
import Link from "next/link";
import SignInOut from "../auth/SingInOut";

export default function Navbar() {
  return (
    <nav className="border-b-[#18191A]  shadow-lg sticky top-0 bg-[#18191A] ">
      <div className="container flex justify-between items-center py-4 ">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Eventry"
              className="h-[45px]"
              height={50}
              width={100}
            />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <SignInOut />
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
}
