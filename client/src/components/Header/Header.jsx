import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../Searchbar/SearchBar";

function Header() {
  return (
    <div>
      <SearchBar />
      <NavBar />
    </div>
  );
}

export default Header;
