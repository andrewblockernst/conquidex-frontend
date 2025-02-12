import React from 'react';

interface SearchButtonProps {
  onSearch: (searchTerm: string) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="bg-[#dbdbdb] px-4 py-1.5 outline-none w-[280px] text-slate-800 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
      name="text"
      placeholder="Buscar"
      type="text"
      onChange={handleSearchChange}
    />
  );
};

export default SearchButton;