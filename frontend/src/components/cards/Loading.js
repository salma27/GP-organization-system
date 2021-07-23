import React from 'react';

const Loading = () => {
    return (
        <tbody>
            <tr>
                <td colSpan="100%" className="py-3">
                    <div className="d-flex justify-content-center mt-3 w-100">
                        <div
                            className="spinner-border  text-primary"
                            role="status"
                        ></div>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default Loading;