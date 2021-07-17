import React from "react";

const SingleSelect = (props) => {
    const {
        options,
        placeholder,
        name,
        label,
        error,
        onChange,
        value = -1,
        className = "form-control",
        disabled,
        callback = null,
    } = {...props};
    return (
        <div style={{width: "inherit"}}>
            {label && (
                <label className="input-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <select
                className={className.concat(error ? " is-invalid" : "")}
                onChange={onChange}
                value={value}
                name={name}
                disabled={disabled}
            >
                {placeholder && (
                    <option value={-1} defaultValue hidden>
                        {placeholder}
                    </option>
                )}
                {options.map(
                    callback
                        ? callback
                        : (option, i) => (
                              <option key={i} value={option}>
                                  {option}
                              </option>
                          )
                )}
            </select>
            {/* {error && (
                <label
                    className="text-danger ml-2 font-weight-light text-xs"
                    htmlFor={name}
                >
                    {error}
                </label>
            )} */}
            {error && <span className="text-danger font-size-1">{error}</span>}
        </div>
    );
};

export default SingleSelect;
