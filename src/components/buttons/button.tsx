"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Utilidad para combinar clases de Tailwind

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

interface ButtonProps {
  variant?: ButtonVariant;
  className?: string;
  contentStyle?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ variant="warning", className, contentStyle, children, disabled=false, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants.base,
        buttonVariants.variants[variant].button,
        disabled && buttonVariants.disabled,
        className
      )}
      onClick={onClick}
    >
      {/*BARRIDO DEL FONDO*/}
      <span className={`absolute inset-0 w-0 transition-all duration-500 group-hover:w-full z-0 ${
          buttonVariants.variants[variant].hover
        }`}></span>
      <span className={`relative ${contentStyle}`}>{children}</span>
    </button>
  );
}

export default Button;

const buttonVariants = {
  base: "w-full flex justify-center items-center text-white gap-2 p-2 h-10 rounded-lg border-2 font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden group",
  
  variants: {
    primary: {
      button: "border-blue-800 bg-blue-500 shadow-[4px_4px_0_0_#323232]",
      hover: "bg-blue-600 text-gray-100",
    },
    secondary: {
      button: "border-gray-800 bg-gray-500 shadow-[4px_4px_0_0_#323232]",
      hover: "bg-gray-600 text-gray-100",
    },
    danger: {
      button: "border-red-800 bg-red-500 shadow-[4px_4px_0_0_#323232]",
      hover: "bg-red-600 text-gray-100",
    },
    warning: {
      button: "border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232]",
      hover: "bg-yellow-600 text-gray-100",
    },
    success: {
      button: "border-green-800 bg-green-500 shadow-[4px_4px_0_0_#323232]",
      hover: "bg-green-600 text-gray-100",
    }
  },
  
  disabled: "opacity-50 cursor-not-allowed"
};