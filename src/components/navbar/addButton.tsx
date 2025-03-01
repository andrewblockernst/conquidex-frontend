"use client";

import { useState } from "react";
import { AddIcon } from "../icons";
import Link from "next/link";
import { X } from "lucide-react";
import Button from "../buttons/button";
import { EVENTS as PARAMS } from '@/constants/url-params';
  
const AddButton: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {isDropdownOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm" />
      )}
      <div className="relative z-20">
        <div className="flex items-center justify-center">
          <button
            id="add-button"
            className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
            onClick={toggleDropdown}
          >
            <AddIcon className="w-8 h-8 text-black" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 text-center w-80 p-4 mb-2 bg-white border-2 border-gray-700 rounded-lg shadow-[4px_4px_0_0_#323232]">
            <div className="flex items-center justify-between">
                <span className="text-black font-semibold">Menú</span>
                <button
                    onClick={toggleDropdown}
                    className="text-black bg-inherit rounded-full p-1 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col mt-2 mb-2 space-y-4">
              <Link href="/unit/add">
                <Button variant="success" onClick={toggleDropdown}>CREAR UNIDAD</Button>
              </Link>
              <Link href="/member/add">
                <Button variant="primary" onClick={toggleDropdown}>CREAR MIEMBRO</Button>
              </Link>
              <Link href={`/calendar?${PARAMS.new}=y#event-form`} onClick={toggleDropdown}>
                  <Button variant="secondary" >CREAR EVENTO</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddButton;