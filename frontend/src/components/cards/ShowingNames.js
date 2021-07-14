import React from 'react';
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as r from "routes/routes";

const ShowingName = (props) => {
    return ( 
        <div>
            <h5 className="personInfo-hidder w-fit-mb">{props.title}</h5>
            <div>
                {props.data.map((t, i) => (
                    <Link to={r.userInfo} key={i}>
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