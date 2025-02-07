import React, { useState } from "react";

interface FilterButtonProps {
  onClick: (option: "units" | "classes") => void;
  currentGroupBy: "units" | "classes";
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  currentGroupBy,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<"units" | "classes">(
    currentGroupBy
  );

  const optionsMap = {
    units: "Unidades",
    classes: "Tarjetas",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionToggle = (option: "units" | "classes") => {
    setSelectedOption(option);
  };

  const handleApply = () => {
    onClick(selectedOption);
    setIsDropdownOpen(false);
  };

  return (
    <div>
        {/* TEXTO CON EL CONTENIDO DE LAS LISTAS (UNIDADES o TARJETAS) 
        <span className="font-bold text-2xl">{optionsMap[selectedOption]}</span> */} {/* A CHEQUEAR ESTO, SI ES MEJOR DEJARLO DENTRO DEL COMPONENTE O POR FUERA -> /club-view.tsx */}

      {/*FilterButton Y SU FUNCION TOGGLE*/}
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex justify-center items-center w-10 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
        >
          <div className="flex items-center justify-center"></div>
          <div className="flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z"
                stroke="#fff"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
        </button>

        {/*FUNCIONALIDAD DEL DROPDOWN*/}
        {isDropdownOpen && (
          <div className="absolute right-0 z-10 w-64 p-4 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <span>Filtrar por:</span>
            <ul className="mt-2 mb-2">
              {Object.entries(optionsMap)
                .filter(([key]) =>
                  optionsMap[key as "units" | "classes"]
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map(([key, label]) => (
                  <li key={key}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="filter-option"
                        checked={selectedOption === key}
                        onChange={() =>
                          handleOptionToggle(key as "units" | "classes")
                        }
                      />
                      <span>{label}</span>
                    </label>
                  </li>
                ))}
            </ul>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleApply}
                type="button"
                className="flex justify-center items-center p-2 w-15 h-7 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
              >
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterButton;
