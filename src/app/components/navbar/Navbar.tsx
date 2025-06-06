'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
    return (  <>
        <div className="w-full bg-white fixed z-50 shadow-sm">
          <div className="py-2 border-b-[1px]">
          <Container>
            <div
              className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md-gap-0"
            
            >
              <Logo/>
              <Search/>
              <UserMenu currentUser={currentUser}/>
            </div>
          </Container>
           
          </div>
        
        </div>
      </> );
}
 
export default Navbar;