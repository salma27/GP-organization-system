const ErrorHandlingInput = ({
    label = "",
    error = "",
    type = "",
    name = "",
    value = "",
    onChange = ()=>{},
    className = "",
    placeholder = "",
    labelID = "",
    id ="",
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
            />
            {error && <label>{error}</label>}
        </>
    );
};
export default ErrorHandlingInput;
