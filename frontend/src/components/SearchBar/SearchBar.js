import React, { useState } from "react";
import "./SearchBar.css";
import ErrorHandlingInput from "../../utils/ErrorHandlingInput";
import { Button } from "utils";

function SearchBar() {
    const [search, setSearch] = useState("Search...");
    return (
        <>
            <div className="searchBar">
                <ErrorHandlingInput
                    id="search"
                    placeholder={search}
                    onChange={(e) => {
                        if (search === "Search...") setSearch(e.target.value);
                        else setSearch(search + e.target.value);
                    }}
                />
                <Button label="search" />
            </div>
        </>
    );
}

export default SearchBar;
