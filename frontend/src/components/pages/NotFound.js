import React from "react";
import {Link} from "react-router-dom";
import {dashboardRoute} from "routes/routes";

const NotFound = () => {
    return (
        <div id="wrapper">
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <div class="container-fluid">
                        <div class="text-center">
                            <div class="error mx-auto" data-text="404">
                                404
                            </div>
                            <p class="lead text-gray-800 mb-5">
                                Page Not Found
                            </p>
                            <p class="text-gray-500 mb-0">
                                It looks like you found a glitch in the
                                matrix...
                            </p>
                            <Link to={dashboardRoute}>
                                &larr; Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
