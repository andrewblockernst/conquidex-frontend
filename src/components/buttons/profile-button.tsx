"use client";

import { useEffect } from "react";

const ProfileButton = () => {
  useEffect(() => {
    // Carga el script de Lordicon solo una vez
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <button
      type="button"
      className="flex justify-center items-center p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
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
      </div>
    </button>
  );
};

export default ProfileButton;
