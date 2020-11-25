import React, { useState } from "react";
import Button from "../../utils/Button";
function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [oneTech, setOne] = useState();
    const selected = () => {
        if (oneTech && !value.includes(oneTech) && oneTech != "-1")
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
                <select onChange={setOneItem}>
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
                <ul>
                    {value.map((v, i) => (
                        <li key={i}>
                            {v}
                            <Button onClick={() => removeItem(i)} label="x" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default FieldsOfExperience;