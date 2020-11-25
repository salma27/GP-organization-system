const ErrorHandlingInput = ({
    label = "",
    error = "",
    type = "",
    name = "",
    value = "",
    borderRadius = "0.7em",
    onChange = () => {},
    className = "",
    placeholder = "",
    labelID = "",
    id = "",
    height = "25px",
}) => {
    return (
        <>
            {label && <label id={labelID}>{label}</label>}
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                id={id}
                style={{ borderRadius: borderRadius, height: height }}
            />
            {error && <label>{error}</label>}
        </>
    );
};
export default ErrorHandlingInput;
