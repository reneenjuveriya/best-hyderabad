import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import AnimationWrapper from "./components/animatio-wrapper";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Hyderabad",
  description: "Best Hyderabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
      {/* <AnimationWrapper> */}
      <ClientOnly>
        <Modal isOpen/>
        <Navbar/>
        {children}
        {/* </AnimationWrapper> */}
      </ClientOnly>

      </body>
    </html>
  );
}
