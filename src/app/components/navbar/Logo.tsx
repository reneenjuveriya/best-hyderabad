'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router= useRouter();
  return (
   
    <div 
  onClick={() => router.push('/')} 
  className="flex items-center space-x-2 cursor-pointer"
>
  <Image 
    alt="logo"
    height="60"
    width="60"
    className="md-block"
    src="/images/image.png"
  />
  {/* <span className="w-4  text-[#001a2c] text-l align-bottom font-semibold">Best Hyderabad</span> */}
</div>

  )
}

export default Logo
