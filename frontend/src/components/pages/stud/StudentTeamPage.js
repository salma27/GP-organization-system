import {TeamInfoCard} from "components/cards";
import React from "react";
import "styles/dashboard.css";

const StudentTeamPage = () => {
    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <TeamInfoCard />
            </div>
            <div className="col-0 col-md-6">
                <div className="d-flex flex-column h-100 pb-4">
                    <div className="img-container">
                        <img className="img" src="/login_bg.svg" alt="bg" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentTeamPage;
