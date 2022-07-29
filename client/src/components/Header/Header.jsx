import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../Searchbar/SearchBar";

function Header() {
  return (
    <div>
      { !window.location.href.split("/").includes("Dashboard") && <div>
      <SearchBar />
      <NavBar />
      </div>}
    </div>
  );
}

export default Header;
