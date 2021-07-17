import React from "react";
//import {Multiselect} from "multiselect-react-dropdown";
import "./MultiSelect.css";

const MultiSelect = (props) => {
    const {
        options,
        displayValue,
        isObject,
        onSelect,
        placeholder,
        selectedValues,
        name,
        singleSelect = false,
        disabled = false,
        label,
        error,
        selectionLimit,
        id,
    } = { ...props };
    const defaultStyle = {
        searchBox: {
            minHeight: "38px",
            padding: "0rem .75rem",
        },
        chips: {
            background: "#4e73df",
            marginTop: 5,
            paddingBottom: 0,
        },
    };
    return (
        <>
            {label && (
                <label className="input-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <Multiselect
                options={options}
                displayValue={displayValue}
                isObject={isObject}
                singleSelect={singleSelect}
                onSelect={(list, item) =>
                    onSelect({
                        target: {
                            value: list,
                            name: name,
                        },
                    })
                }
                onRemove={(list, item) =>
                    onSelect({
                        target: {
                            value: list,
                            name: name,
                        },
                    })
                }
                disablePreSelectedValues={disabled}
                placeholder={placeholder}
                style={defaultStyle}
                selectionLimit={selectionLimit}
                selectedValues={selectedValues}
                hidePlaceholder
                id={id}
            />
            {error && (
                <label
                    className="text-danger ml-2 font-weight-light text-xs"
                    htmlFor={id}
                >
                    {error}
                </label>
            )}
        </>
    );
};

export default MultiSelect;
