import React from "react";
import "./SearchBar.css";
import ErrorHandlingInput from "../../utils/ErrorHandlingInput"; 

function SearchBar() {
    
    return (
        <>
            <div className="searchBar"> 
                <ErrorHandlingInput id="search" placeholder="Search..." />
                
                <button id="searchBtn">Search</button>
            </div>
        </>
    );
}

export default SearchBar;
