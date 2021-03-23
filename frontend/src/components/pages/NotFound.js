import {Navbar} from "components/navbar";
import React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {dashboardRoute} from "routes/routes";

const NotFound = () => {
    return (
        <div id="wrapper">
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Navbar multilingual />
                    <div class="container-fluid">
                        <div class="text-center">
                            <div class="error mx-auto" data-text="404">
                                <FormattedMessage
                                    id="404"
                                    defaultMessage="404"
                                />
                            </div>
                            <p class="lead text-gray-800 mb-5">
                                <FormattedMessage
                                    id="page_not_found"
                                    defaultMessage="Page Not Found"
                                />
                            </p>
                            <p class="text-gray-500 mb-0">
                                <FormattedMessage
                                    id="glitch"
                                    defaultMessage=" It looks like you found a glitch in the matrix..."
                                />
                            </p>
                            <Link to={dashboardRoute}>
                                &larr;
                                <FormattedMessage
                                    id="back_to_dashboard"
                                    defaultMessage="Back to Dashboard"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
