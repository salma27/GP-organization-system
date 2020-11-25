const ErrorHandlingInput = ({
    label = "",
    error = "",
    type = "text",
    name = "",
    value = "",
    borderRadius = "0.7em",
    onChange = () => {},
    onClick = () =>{},
    className = "",
    placeholder = "",
    labelID = "",
    id = "",
    height = "25px",
    paddingLeft = "10px",
}) => {
    return (
        <>
            {label && <label id={labelID}>{label}</label>}
            <input
                onClick = {onClick}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                id={id}
                style={{
                    borderRadius: borderRadius,
                    height: height,
                    paddingLeft: paddingLeft,
                }}
            />
            {error && <label>{error}</label>}
        </>
    );
};
export default ErrorHandlingInput;
