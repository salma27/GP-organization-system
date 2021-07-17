import React from "react";

const Card = ({header, children}) => (
    <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">{header}</h6>
        </div>
        <div className="card-body">{children}</div>
    </div>
);
export default Card;
