import React from 'react';
import "./SearchBar.css"
import * as r from "routes/routes";
import {useHistory} from "react-router";

const SearchForm = () => {
    const [search, setSearch] = React.useState({search:"",type:""});
    const history = useHistory();
    
    const onChangeHandler = ({target: {name, value}}) => {
        setSearch({...search,[name]:value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(search)
        if(search.search.length > 0)
            history.push(`${r.SearchResult}/${search.search}/${search.type}`)
        else 
            history.push(`${r.SearchResult}/all/${search.type}`)
    };
    return ( 
        <div>
            <form className="d-flex" onSubmit={onSubmit} >
                <div className="d-flex border mr-1">
                    <input className="form-control me-2 no-border" type="search" placeholder="Search" aria-label="Search" name="search" value={search.search} onChange={onChangeHandler}/>
                    <span className="border-right"></span>
                    <select className="form-select text-center no-border" aria-label="Default select example" name="type" value={search.type} onChange={onChangeHandler} required>
                        <option value="" >select</option>
                        <option value="students">Students</option>
                        <option value="Drs">Doctors</option>
                        <option value="TAs">Teacher Assistants</option>
                    </select>
                </div>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
     );
}
 
export default SearchForm;