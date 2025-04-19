import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import Categories from "./components/navbar/Categories";
import Banner from "./components/Banner";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser= await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <AnimationWrapper> */}
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal/>
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
          <Banner/>
          <Categories />
          {/* </AnimationWrapper> */}
        </ClientOnly>
        <div className="pb-20 pt-8">
          {children}
        </div>
      </body>
    </html>
  );
}
