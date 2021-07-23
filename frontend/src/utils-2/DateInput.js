import React from "react";
//import DatePicker from "react-datepicker";
import ValidatedInput from "./ValidatedInput";
//import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

const DateInput = ({ value, name, onChange, ...props }) => {
    const onChangeHandler = (date) => {
        onChange({ target: { name: name, value: date } });
    };
    const CustomInput = ({ value: v, onClick }) => (
        <ValidatedInput
            onChange={onChange}
            {...props}
            value={v}
            onClick={onClick}
            name={name}
        />
    );

    return (
        <DatePicker
            selected={value}
            onChange={onChangeHandler}
            // isClearable
            popperPlacement="top-end"
            popperModifiers={{
                offset: {
                    enabled: true,
                    offset: "5px, 10px",
                },
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                },
            }}
            customInput={<CustomInput />}
            className="w-100"
            todayButton="Today"
        />
    );
};
export default DateInput;
