import React, { useState } from 'react';

type Props = {};

const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");

  //Update the searchText on input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = event.target.value;
    setSearchText(searchValue);
  }
  
  return (
    <div>
      <input className="search__input" type="search" value={searchText} onChange={ handleChange }/>
      <text>{searchText}</text>
    </div>
  )
}

export default SearchBar;
