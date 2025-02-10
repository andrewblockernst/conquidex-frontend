import React, { useState, useEffect, useRef } from 'react';

const CircularMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttons = 6; // Número de botones a mostrar
  const radius = 70; // Radio del círculo en píxeles
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-5 mb-5" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group cursor-pointer outline-none hover:rotate-90 duration-300 z-20"
        title={isOpen ? "Close" : "Add New"}
        style={{ backgroundColor: 'transparent' }}
      >
        {isOpen ? (
          <svg
            className="stroke-amber-400 fill-none group-hover:fill-amber-800 group-active:stroke-amber-200 group-active:fill-amber-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="75"
            width="75"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeWidth="2" d="M6 6L18 18" />
            <path strokeWidth="2" d="M6 18L18 6" />
          </svg>
        ) : (
          <svg
            className="stroke-amber-400 fill-none group-hover:fill-amber-800 group-active:stroke-amber-200 group-active:fill-amber-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="75"
            width="75"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeWidth="2" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
            <path strokeWidth="2" d="M8 12H16" />
            <path strokeWidth="2" d="M12 16V8" />
          </svg>
        )}
      </button>

      {/* Botones secundarios */}
      <div className={`absolute left-1/2 bottom-full transform -translate-x-1/2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-white p-4 rounded-lg shadow-lg`}>
        <div className="relative w-full h-full flex flex-wrap justify-center items-center">
          {[...Array(buttons)].map((_, index) => {
            const angle = (index * (360 / buttons) - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <button
                key={index}
                className={`absolute transition-all duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } flex justify-center items-center w-12 h-12 rounded-full border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600`}
                style={{
                  backgroundColor: 'transparent',
                  transform: `translate(${x}px, ${y}px) scale(${isOpen ? 1 : 0})`
                }}
              >
                <svg
                  className="stroke-amber-400 fill-none hover:fill-amber-800 active:stroke-amber-200 active:fill-amber-600 active:duration-0 duration-300"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeWidth="2" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
                  <path strokeWidth="2" d="M8 12H16" />
                  <path strokeWidth="2" d="M12 16V8" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CircularMenuButton;