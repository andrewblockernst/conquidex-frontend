import React from "react";

interface SearchButtonProps {
  onSearch: (searchTerm: string) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="bg-[#dbdbdb] px-4 py-1.5 outline-none w-full text-slate-800 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#958059] border-[#403c2b]"
      name="text"
      placeholder="Buscar"
      type="text"
      onChange={handleSearchChange}
    />
  );
};

export default SearchButton;
