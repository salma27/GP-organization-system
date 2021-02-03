import React, { useState } from "react";
//import Button from "../../utils/Button";
import "./FieldsOfExperience.css";
import { Button } from "react-bootstrap";
//import {BootstrapButton}

function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [oneTech, setOne] = useState();
    const selected = () => {
        if (oneTech && !value.includes(oneTech) && oneTech !== "-1")
            setValue([...value, oneTech]);
    };
    const setOneItem = (e) => setOne(e.target.value);
    const removeItem = (index) => {
        const temp = [];
        value.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        });
        setValue(temp);
    };
    return (
        <div>
            <div>
                <label>Fields Of Experience:</label>
                <select onChange={setOneItem} id="experienceList">
                    <option value="-1"></option>
                    {props.tech.map((addField) => (
                        <option value={addField} key={addField}>
                            {addField}
                        </option>
                    ))}
                </select>
                <Button onClick={selected} label="+" />
            </div>
            <div id="field">
                <table id="addedFields">
                    {value.map((v, i) => (
                        <tr key={i}>
                            <td className="choosen">- {v}</td>
                            <td>
                                <Button
                                    block
                                    size="lg"
                                    type="submit"
                                    //disabled={!validateForm()}
                                    //id="loginBtn"

                                    //variant="dark"
                                    //bd="sm"
                                    onClick={() => removeItem(i)}
                                    //label="X"
                                    //className="delete"
                                    width="55px"
                                    height="25px"
                                >
                                    X
                                </Button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}
export default FieldsOfExperience;
