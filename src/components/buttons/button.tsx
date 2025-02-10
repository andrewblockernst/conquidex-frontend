'use client'

import React from 'react'

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
    type="button"
    className={`flex justify-center items-center gap-2 p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] text-white font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100 ${className}`}
    onClick={onClick}>
    {/*BARRIDO DEL FONDO*/}
    <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 group-hover:w-full z-0"></span>
    <span className="relative z-10">{children}</span>
  </button>
  )
}

export default Button