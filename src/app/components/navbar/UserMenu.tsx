"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal= useRentModal();
  const router=useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onRent = useCallback(() => {
    if(!currentUser){
      loginModal.onOpen();
    }

    rentModal.onOpen();

  },[currentUser,rentModal, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden md:block text-sm font-semibold py-3 px-4 rounded hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4 md:py-1 md:px-1 border-[1px] border-neutral-200 flex flex-row
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md
            w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  onClick={() => {}} 
                  label="My trips" 
                />
                <MenuItem 
                  onClick={() => router.push('/favourites')} 
                  label="My Favourites" 
                />
                { currentUser?.isAdmin && <MenuItem 
                  onClick={() => router.push('/properties')} 
                  label="My Listings" 
                />}
                 <MenuItem 
                  onClick={() => signOut()} 
                  label="Logout" 
                />
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={loginModal.onOpen} 
                  label="login" 
                />
                <MenuItem 
                  onClick={registerModal.onOpen} 
                  label="Sign Up" 
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
