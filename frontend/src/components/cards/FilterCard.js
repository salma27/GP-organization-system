import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Select, SpinnerButton } from "utils";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRequest } from "hooks";
import { getOldProjects } from "requests";

const techs = [
    { label: "Machine learning", value: "ML" },
    { label: "Artifial intelligence", value: "AI" },
    { label: "Mobile app development", value: "MD" },
    { label: "Web development", value: "WD" },
];
const years = [
    { label: "1999", value: 1999 },
    { label: "2000", value: 2000 },
    { label: "2020", value: 2020 },
];
const cardStyle = {
    backgroundColor: "#00bfa6",
    color: "white",
    borderStyle: "solid",
    borderColor: "#00bfa6",
};
const FilterCard = ({ year = true, setProject }) => {
    const [filter, setFilter] = useState({ regex: "", tech: [], year: "" });

    const onChangeHandler = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value });
    };

    const [request, requesting] = useRequest(getOldProjects);

    function onSubmit(event) {
        event.preventDefault();
        // console.log(filter);
        request({
            year: filter.year.value,
            description: filter.regex,
            technologyIds: filter.tech,
        })
            .then((r) => {
                console.log(r.data);
                setProject(r.data);
            })
            .catch((e) => {
                toast.error("Error Filtering");
            });
    }

    return (
        <Card className="mb-3" style={cardStyle}>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Card.Text></Card.Text>
                <hr />
                <div className="text-secondary">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-lg-12 mb-3">
                            {/* <Form inline onSubmit={onSubmit}>
                            </Form> */}
                            <FormControl
                                type="text"
                                placeholder="Enter keywords to search with"
                                value={filter.regex}
                                name="regex"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-12 mb-3">
                            <Select
                                name="tech"
                                options={techs}
                                isMulti
                                onChange={onChangeHandler}
                                placeholder="Select technologies"
                            />
                        </div>
                        {year !== false && (
                            <div className="col-sm-6 col-md-3 col-lg-12 mb-3">
                                <Select
                                    name="year"
                                    options={years}
                                    onChange={onChangeHandler}
                                    placeholder="Select a year"
                                />
                            </div>
                        )}
                        <div className="col-sm-6 col-md-1 col-lg-12">
                            <SpinnerButton
                                className="btn btn-outline-light w-100"
                                onClick={onSubmit}
                                loading={false}
                            >
                                <div className="d-none d-md-inline">
                                    <AiOutlineFilter className="mr-lg-1" />
                                </div>
                                <div className="d-inline d-md-none d-lg-inline">
                                    Filter
                                </div>
                            </SpinnerButton>
                        </div>
                    </div>
                </div>
                <Card.Text className="d-flex"></Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FilterCard;
