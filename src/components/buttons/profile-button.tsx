"use client";

import { useEffect, useState } from "react";
import { AuthButton } from "./auth-button";

const ProfileButton = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    // Carga el script de Lordicon solo una vez
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div>
      <button
        type="button"
        className="flex justify-center items-center p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
        onClick={toggleCardVisibility}
      >
        <div className="flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/kdduutaw.json"
            trigger="hover"
            stroke="bold"
            state="hover-looking-around"
            colors="primary:#ffffff,secondary:#ffffff"
            style={{ width: "30px", height: "30px" }}
            strokeWidth="1.5"
          ></lord-icon>
          <span className="ml-2 text-white text-lg font-semibold mr-2">
            Perfil
          </span>
        </div>
      </button>
      {isCardVisible && (
        <div className="absolute right-0 z-10 w-64 p-4 mt-2 bg-yellow-500 border-2 border-yellow-800 rounded-lg shadow-[4px_4px_0_0_#323232]">
          <button
            type="button"
            className="flex justify-center items-center w-30 h-9 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
          >
            <div className="flex items-center justify-center">
              <span className="ml-2 text-white text-lg font-semibold mr-2">
                Mi Perfil
              </span>
            </div>
          </button>

          <ul className="list-none flex flex-col gap-2 px-2.5">
            <li>
              <button
                type="button"
                className="flex justify-center items-center w-full h-9 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-[25px] h-[25px] group-hover:stroke-white"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="#ffffff"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle r={3} cy={12} cx={12} />
                  </svg>
                  <span className="ml-2 text-white text-lg font-semibold mr-2">
                    Info club
                  </span>
                </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex justify-center items-center w-full h-9 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 32 32"
                  >
                    <path d="M 21 3 C 16.570313 3 13 6.570313 13 11 C 13 11.234375 13.035156 11.554688 13.0625 11.84375 L 4.5 20.40625 C 2.53125 22.375 2.53125 25.53125 4.5 27.5 C 6.46875 29.46875 9.625 29.46875 11.59375 27.5 L 20.15625 18.9375 C 20.445313 18.964844 20.765625 19 21 19 C 25.429688 19 29 15.429688 29 11 C 29 9.632813 28.648438 8.367188 28.0625 7.3125 L 27.4375 6.15625 L 26.5 7.09375 L 22.1875 11.375 L 20.625 9.8125 L 24.90625 5.5 L 25.84375 4.5625 L 24.6875 3.9375 C 23.632813 3.351563 22.367188 3 21 3 Z M 21 5 C 21.484375 5 21.847656 5.207031 22.28125 5.3125 L 17.78125 9.8125 L 18.5 10.5 L 21.5 13.5 L 22.1875 14.21875 L 26.6875 9.71875 C 26.792969 10.152344 27 10.515625 27 11 C 27 14.371094 24.371094 17 21 17 C 20.601563 17 20.277344 17 20.03125 16.9375 L 19.5 16.78125 L 10.1875 26.09375 C 8.957031 27.324219 7.136719 27.324219 5.90625 26.09375 L 5.875 26.0625 C 4.675781 24.832031 4.683594 23.035156 5.90625 21.8125 L 15.21875 12.5 L 15.0625 11.96875 C 15 11.722656 15 11.398438 15 11 C 15 7.628906 17.628906 5 21 5 Z"></path>
                  </svg>
                  <span className="ml-2 text-white text-lg font-semibold mr-2">
                    Soporte
                  </span>
                </div>
              </button>
            </li>
          </ul>

          <div className="border-t border-[#4a4942]" />

          <ul className="list-none flex flex-col gap-2 px-2.5">
            <li>
              <button
                type="button"
                className="flex justify-center items-center w-full h-9 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
              >
                <div className="flex items-center justify-center">
                  <AuthButton />
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
