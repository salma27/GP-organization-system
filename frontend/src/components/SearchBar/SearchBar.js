import React, { useState } from "react";
import "./SearchBar.css";
import ErrorHandlingInput from "../../utils/ErrorHandlingInput"; 
import { Button } from "utils";

function SearchBar() {
    const [search,setSearch] = useState("Search...");
    return (
        <>
            <div className="searchBar"> 
                <ErrorHandlingInput 
                    id="search" 
                    value = {search}
                    onClick = {() =>{
                        if(search === "Search...")
                            setSearch("");
                    }}
                onChange = {e=>setSearch(e.target.value)
                } />
                <Button id="searchBtn" label = "search" />
            </div>
        </>
    );
}

export default SearchBar;
