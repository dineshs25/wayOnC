import React from 'react';

const Search = ({setSearch}) => {
  return (
    <>
      <input
        type="search"
        placeholder="Search By Email"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default Search;
