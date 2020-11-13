import React from 'react'
import "./SearchBar.css";

function SearchBar() {
    return (
        <>
            <div className="searchBar">
                <input id="search" placeholder="Search..."></input>
                <button id="searchBtn">Search</button>
            </div>
        </>
    );
}


export default SearchBar;