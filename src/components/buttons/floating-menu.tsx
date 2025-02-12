import React, { useState, useEffect, useRef } from "react";

const CircularMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttons = 4; // Number of buttons to show
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative mr-12 mb-9" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-center items-center w-12 h-12 mr-5 mb-5 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
                title={isOpen ? "Close" : "Add New"}

            >
            </button>

            {/* Secondary buttons */}
            <div
                className={`absolute left-1/2 bottom-full transform -translate-x-1/2 transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                } border-2 border-yellow-800 bg-yellow-500 p-4 rounded-lg shadow-[4px_4px_0_0_#323232]`}
            >
                {[...Array(buttons)].map((_, index) => {
                    const y = index * 120; // Adjust the distance between buttons

                    return (
                        <div
                            key={index}
                            className={`relative -bottom-44 transform -translate-x-1/2 transition-all duration-300 ${
                                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                            style={{
                                transform: `translateY(${isOpen ? -y : 10}px) scale(${
                                    isOpen ? 1.1 : 0
                                })`,
                                marginBottom: 10,
                            }}
                        >
                            <button className="flex justify-center items-center mt-3 w-12 h-12 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"></button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CircularMenuButton;
