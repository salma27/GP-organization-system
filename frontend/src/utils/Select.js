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
            onChange={(props) => console.log(props)}
        />
    );
};
export default SingleSelect;
