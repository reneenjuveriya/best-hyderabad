"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="relative bg-cover bg-center h-[250px] md:h-[350px] ">
        <div className="absolute inset-0 bg-[#001a2c] rounded-md flex items-center justify-center text-center px-4">
          <div className="absolute top-0 left-0 w-full h-20 z-10 pointer-events-none">
            {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-0.5 h-0.5 bg-[#ffbe0b] rounded-full"
                style={{
                  top: `${Math.random() * (isMobile ? 40 : 70)}px`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          <div className="w-52 h-52 md:w-64 md:h-64 relative">
            <Image
              alt="Charminar Logo"
              src="/images/charminar2.png"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-white text-2xl md:text-4xl text-left font-bold">
              Discover Hyderabad’s Hidden Gems
            </h1>
            <p className="text-gray-200 mt-3 text-left text-lg">
              Restaurants, cafes, malls and more – handpicked for you.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
