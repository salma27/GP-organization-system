import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Select, SpinnerButton } from "utils";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { AiOutlineFilter } from "react-icons/ai";
import { useDepartments, useTechnology } from "hooks";
import { toast } from "react-toastify";

const cardStyle = {
    backgroundColor: "#00bfa6",
    color: "white",
    borderStyle: "solid",
    borderColor: "#00bfa6",
};

const FilterStudents = ({ setResults, request, requesting, name }) => {
    const [filter, setFilter] = useState({
        name: "",
        ecomId: "",
        technologyIds: [],
        departmentId: "",
    });
    const [, , techs] = useTechnology();
    const [, , dep] = useDepartments();

    const onChangeHandler = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value });
    };
    const onMultiSelectHandler = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value.map((v) => v.value) });
    };
    const onSelectHandler = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value ? value.value : "" });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        request({
            name: filter.name.length ? filter.name : undefined,
            ecomId: filter.ecomId.length ? filter.ecomId : undefined,
            technologyIds: filter.technologyIds.length
                ? filter.technologyIds
                : undefined,
            departmentId: filter.departmentId.length
                ? filter.departmentId
                : undefined,
        })
            .then((r) => {
                setResults(
                    name === "students" ? r.data.students : r.data.supervisors
                );
                toast.success("Data loaded successfully");
            })
            .catch((e) => {
                toast.error("Error viewing search results");
            });
    };

    return (
        <Card className="mb-3" style={cardStyle}>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Card.Text></Card.Text>
                <hr />
                <div className="text-secondary">
                    <div className="row">
                        <div className="col-sm-6 col-lg-12 mb-3">
                            <FormControl
                                type="text"
                                placeholder="Enter student name"
                                value={filter.name}
                                name="name"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="col-sm-6 col-lg-12 mb-3">
                            <FormControl
                                type="text"
                                placeholder="Enter Ecom ID"
                                value={filter.ecomId}
                                name="ecomId"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="col-sm-6 col-lg-12 mb-3">
                            <Select
                                name="technologyIds"
                                options={techs}
                                isMulti
                                onChange={onMultiSelectHandler}
                                placeholder="Select technologies"
                            />
                        </div>
                        <div className="col-sm-6 col-lg-12 mb-3">
                            <Select
                                name="departmentId"
                                options={dep}
                                onChange={onSelectHandler}
                                placeholder="Select Department"
                            />
                        </div>
                        <div className="col-sm-6 col-md-12 col-lg-12">
                            <SpinnerButton
                                className="btn btn-outline-light w-100"
                                onClick={onSubmit}
                                loading={requesting}
                            >
                                <div className="d-md-inline">
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
export default FilterStudents;
