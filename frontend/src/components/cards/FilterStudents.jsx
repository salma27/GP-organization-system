import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Select, SpinnerButton} from "utils";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import {AiOutlineFilter} from "react-icons/ai";

const techs = [
    {label: "Machine learning", value: "ML"},
    {label: "Artifial intelligence", value: "AI"},
    {label: "Mobile app development", value: "MD"},
    {label: "Web development", value: "WD"},
];

const cardStyle = {
    backgroundColor: "#00bfa6",
    color: "white",
    borderStyle: "solid",
    borderColor: "#00bfa6",
};

const FilterStudents = ({}) => {
    const [filter, setFilter] = useState({regex: "", tech: []});

    const onChangeHandler = ({target: {name, value}}) => {
        setFilter({...filter, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

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
                        
                        <div className="col-sm-6 col-md-1 col-lg-12">
                            <SpinnerButton
                                className="btn btn-outline-light w-100"
                                onClick={() => console.log(filter)}
                                loading={false}
                            >
                                <div className="d-none d-md-inline">
                                    <AiOutlineFilter className="mr-lg-1"/>
                                </div>
                                <div className="d-inline d-md-none d-lg-inline">Filter</div>
                            </SpinnerButton>
                        </div>
                    </div>
                </div>
                <Card.Text className="d-flex"></Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FilterStudents;
