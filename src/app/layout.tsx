import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import AnimationWrapper from "./components/animatio-wrapper";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

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
      <body className={font.className}>
        {/* <AnimationWrapper> */}
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
          {children}
          {/* </AnimationWrapper> */}
        </ClientOnly>
      </body>
    </html>
  );
}
