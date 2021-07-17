import React from 'react';
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as r from "routes/routes";

const ShowingName = ({title,data=[],isStudent=false}) => {
    return ( 
        <div>
            <h5 className="personInfo-hidder w-fit-mb">{title}</h5>
            <div>
                {isStudent && 
                    data.map((t, i) => (
                        <Link to={r.userInfo} key={i}>
                            <Badge
                                pill
                                className="mr-1 mb-1 name-link"
                            >
                                {t}
                            </Badge>
                        </Link>
                        
                ))}
                {!isStudent && 
                    data.map((t, i) => (
                        <Link to={r.staffInfo} key={i}>
                            <Badge
                                pill
                                className="mr-1 mb-1 name-link"
                            >
                                {t}
                            </Badge>
                        </Link>
                        
                ))}
            </div>
        </div>
    );
}
 
export default ShowingName;