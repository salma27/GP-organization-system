//import "./Button.css";
import React from "react";
import {Button} from "react-bootstrap";

const BsButton = ({
    width = "",
    label = "",
    type = "submit",
    height = "",
    borderRadius = "",
    value = "",
    size = "lg",
    variant = "secondary",
    onChange = () => {},
    onClick = () => {},
    disabled = "",
    className = "",
    error = "",
    id = "",
    block = "block",
}) => {
    return (
        <>
            <Button
                display={block}
                variant={variant}
                width={width}
                height={height}
                borderRadius={borderRadius}
                value={value}
                onChange={onChange}
                onClick={onClick}
                size={size}
                type={type}
                disabled={disabled}
                id={id}
                className={className}
            >
                {label}
            </Button>
            {error && <label>{error}</label>}
        </>
    );
};
export default BsButton;
