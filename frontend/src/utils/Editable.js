import React, { useEffect, useState } from "react";

const Editable = ({
    text = "string",
    type = "",
    placeholder = "",
    value = "",
    childRef = "",
}) => {
    const [isEditing, setEditing] = useState(false);

    const handleKeyDown = (event, type) => {};
    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);
    return (
        <>
            <section
                placeholder={placeholder}
                value={value}
                type={type}
                text={text}
            >
                {isEditing ? (
                    <div
                        onBlur={() => setEditing(false)}
                        onKeyDown={(e) => handleKeyDown(e, type)}
                    >
                        {value}
                    </div>
                ) : (
                    <div onClick={() => setEditing(true)}>
                        <span>{text || placeholder || "Editable content"}</span>
                    </div>
                )}
            </section>
        </>
    );
};

export default Editable;
