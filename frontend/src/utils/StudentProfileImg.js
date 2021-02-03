import { SearchBar } from "components/SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import { FaBox } from "react-icons/fa";

const StudentProfileImg = ({}) => {
    return (
        <>
            <Container>
                <Row width="100%">
                    <Col sm={12} lg={6} md={6} width="50%">
                        <svg
                            width="100%"
                            //height={height}
                            viewBox="0 0 100% 100%"
                            class="injected-svg gridItem__media"
                            style={{
                                float: "left",
                            }}
                        >
                            <circle
                                cx="200"
                                cy="80"
                                r="70"
                                fill="#3f3d56"
                            ></circle>

                            <polygon
                                points="200 60 170 120 230 120"
                                fill="#00bfa6"
                            ></polygon>
                            <circle
                                cx="200"
                                cy="60"
                                r="25"
                                fill="white"
                            ></circle>
                            <circle cx="193" cy="55" r="4"></circle>
                            <circle cx="208" cy="55" r="4"></circle>
                        </svg>
                    </Col>
                    <Col sm={12} md={6} lg={6} width="50%">
                        <svg
                            width="100%"
                            //height={height}
                            viewBox="0 0 100% 100%"
                            class="injected-svg gridItem__media"
                            style={{ float: "left" }}
                        >
                            <circle
                                cx="5"
                                cy="55"
                                r="4"
                                fill="#00bfa6"
                            ></circle>
                            <circle
                                cx="5"
                                cy="75"
                                r="4"
                                fill="#00bfa6"
                            ></circle>
                            <circle
                                cx="5"
                                cy="95"
                                r="4"
                                fill="#00bfa6"
                            ></circle>
                            <circle
                                cx="5"
                                cy="115"
                                r="4"
                                fill="#00bfa6"
                            ></circle>
                            <polygon
                                points="50 55 375 55 375 57 50 57"
                                fill="#3f3d56"
                            ></polygon>
                            <polygon
                                points="50 75 375 75 375 77 50 77"
                                fill="#3f3d56"
                            ></polygon>
                            <polygon
                                points="50 95 375 95 375 97 50 97"
                                fill="#3f3d56"
                            ></polygon>
                            <polygon
                                points="50 115 375 115 375 117 50 117"
                                fill="#3f3d56"
                            ></polygon>
                        </svg>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default StudentProfileImg;
