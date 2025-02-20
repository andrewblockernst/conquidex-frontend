"use client";

import Link from "next/link";
import SyncButton from "../buttons/sync-button";
import SyncProfileModal from "../modals/syncprofile-modal/syncprofile-modal-client";
import ProfileButton from "../buttons/profile-button";
//import { HamburgerIcon, CloseIcon } from "../icons"; // POR EL MOMENTO QUEDA COMENTADO POR SI SE LLEGA A REUTILIZAR EL COMPONENTE
import { useUser } from "@/contexts/UserContext";

//interface Props {}

export const Header = () => {
  //const [menuOpen, setMenuOpen] = useState(false); // POR EL MOMENTO QUEDA COMENTADO POR SI SE LLEGA A REUTILIZAR EL COMPONENTE
  const { user } = useUser();

  return (
    <>
      <header className="bg-yellow-500 text-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO PARA EL DESKTOP DESIGN */}
            <Link href="/home" className="flex items-center space-x-2">
              <img
                src="/logo-blanco.png"
                alt="Conquidex"
                className="h-10 w-auto md:block hidden"
              />

              {/* LOGO PARA EL MOBILE DESIGN */}
              <img
                src="\panuelo-solo.png"
                alt="Conquidex"
                className="h-10 w-auto md:hidden block"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-2">
              {user && (
                <>
                  <SyncButton />
                  <ProfileButton />
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:hidden items-center space-x-2">
              {user && <SyncButton />}
            </div>
          </div>
        </div>
      </header>

      <SyncProfileModal />
    </>
  );
};
