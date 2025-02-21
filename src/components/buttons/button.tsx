"use client";

import React from "react";

interface ButtonProps {
  buttonStyle?: string;
  transitionColor?: string;
  contentStyle?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ buttonStyle, transitionColor, contentStyle, children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`w-full flex justify-center items-center gap-2 p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100 ${buttonStyle}`}
      onClick={onClick}
    >
      {/*BARRIDO DEL FONDO*/}
      <span className={`absolute inset-0 w-0 bg-yellow-600  transition-all duration-500 group-hover:w-full z-0 ${transitionColor}`}></span>
      <span className={`relative z-10 ${contentStyle}`}>{children}</span>
    </button>
  );
}

export default Button;
