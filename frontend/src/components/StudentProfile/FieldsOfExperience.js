
import React, { useState } from 'react';

function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [oneTech, setOne] = useState();
    const selected = () => { if (oneTech && !value.includes(oneTech) && oneTech != "-1") setValue([...value, oneTech]) };
    const setOneItem = (e) => setOne(e.target.value);
    const removeItem = (index) => {
        const temp = [];
        value.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        })
        setValue(temp);
    }
    return (
        <div>
            <div>
                <label>Fields Of Experience:</label>
                <select onChange={setOneItem}><option value="-1" >
                </option>{props.tech.map(addField => <option value={addField} key={addField}>{addField}</option>)}</select>
                <button onClick={selected}>+</button>
            </div>
            <div id="field"><ul>
                {value.map((v, i) =>
                    <li key={i}>{v}<button onClick={() => removeItem(i)}>x</button></li>
                )}
            </ul></div>
        </div>
    );
}
export default FieldsOfExperience;