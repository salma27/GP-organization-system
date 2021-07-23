import React, {useState, useEffect} from 'react';
import {Badge, Card} from "react-bootstrap";
import "./../../css/personInfoCard.css";
import { useRequest } from "hooks";
import { getSpecificTechnology } from "requests";
import { toast } from "react-toastify";

const Technologies = ({tech=[]}) => {
    const [technologies,setTech] = useState([]);
    const [request, requesting] = useRequest(getSpecificTechnology);

    // useEffect(() => {
    //     const temp = [];
    //     tech.forEach(id=>{
    //         request(id)
    //         .then((r) => {
    //             // console.log(r.data);
    //             // setTech([...technologies,r.data.name]);
    //             temp.push(r.data.name)
    //         })
    //         .catch((e) => {
    //             toast.error("Error getting technologies");
    //         });
    //     })
    //     setTech(temp);

    // }, []);
    
    return ( 
        
        <Card.Text>
            {tech && tech.map((t, i) => (
                <Badge
                    pill
                    style={{
                        // backgroundColor: "white",
                        color: "#00BFA6",
                        borderColor: "#00BFA6",
                        borderWidth: "1px",
                        borderStyle: "solid",
                    }}
                    className="mr-1 mb-1"
                    key={i}
                >
                    {t}
                </Badge>
            ))}
            {tech&&!tech.length && "No technologies provided"}
        </Card.Text>
    );
}
 
export default Technologies;