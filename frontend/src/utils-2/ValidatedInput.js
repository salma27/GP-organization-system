import React from "react";

const ValidatedInput = (props) => {
    const {
        label,
        name,
        id,
        error,
        className = "form-control",
        children,
        ...rest
    } = {
        ...props,
    };
    return (
        <div>
            {label && (
                <label className="input-label" htmlFor={id ? id : name}>
                    {label}
                </label>
            )}
            <input
                className={className.concat(error ? " is-invalid" : "")}
                name={name}
                id={id}
                {...rest}
            />
            {/* {error && (
                <label className="text-danger ml-2 font-weight-light text-xs">
                    {error}
                </label>
            )} */}
            {children ? children : null}
            {children ? <br /> : null}
            {error && <span className="text-danger font-size-1">{error}</span>}
        </div>
    );
};

export default ValidatedInput;
