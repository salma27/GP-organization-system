import React from "react";
import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const animatedComponents = makeAnimated();

const SingleSelect = ({
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    isRtl = false,
    isSearchable = true,
    name = "",
    options = [],
    onChange = () => {},
    ...rest
}) => {
    return (
        <Select
            className="basic-single"
            // components={animatedComponents}
            classNamePrefix="select"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name={name}
            options={options}
            onChange={(value) => onChange({target: {name, value}})}
            {...rest}
        />
    );
};
export default SingleSelect;
