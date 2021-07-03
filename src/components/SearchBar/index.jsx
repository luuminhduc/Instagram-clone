import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      className="border border-solid border-gray-200 py-1 px-3 w-64 md:block hidden"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
