'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router= useRouter();
  return (
    // <Image 
    //     alt="logo"
    //     className="hidden md-block cursor-pointer"
    //     src=""
    // />
    <div onClick={() => router.push('/')}>
        Logo
    </div>
  )
}

export default Logo
