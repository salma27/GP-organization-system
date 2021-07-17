import React from "react";

const SpinnerButton = (props) => {
    const {loading, className, type = "submit", onClick = () => {}, style, disabled, ...rest} = {
        ...props,
    };
    return (
        <button
            className={className + (loading || disabled ? " cursor-not-allowed" : "")}
            type={type}
            disabled={loading || disabled}
            onClick={onClick}
            style={style}
            {...rest}
        >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : props.children}
        </button>
    );
};

export default SpinnerButton;
