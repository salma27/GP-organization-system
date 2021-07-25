import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Select, SpinnerButton } from "utils";
import FormControl from "react-bootstrap/FormControl";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDepartments, useTechnology, useYears } from "hooks";

const cardStyle = {
    backgroundColor: "#00bfa6",
    color: "white",
    borderStyle: "solid",
    borderColor: "#00bfa6",
};
const FilterCard = ({ year = true, setProjects, request }) => {
    const [, , techs] = useTechnology();
    const [, , dep] = useDepartments();
    const [, , years] = useYears();

    const initialFilter = {
        description: "",
        technologyIds: [],
        year: 0,
        departmentId: "",
    };
    const [filter, setFilter] = useState(initialFilter);
    const [requesting, setRequesting] = useState(false);

    const onChangeHandler = ({ target: { name, value } }) => {
        setFilter({ ...filter, [name]: value });
    };
    const onSelectHandler = ({ target: { name, value } }) => {
        if (name === "technologyIds")
            setFilter({ ...filter, [name]: value.map((v) => v.value) });
        else {
            if (value) setFilter({ ...filter, [name]: value.value });
            else setFilter({ ...filter, [name]: initialFilter[name] });
        }
    };

    function onSubmit(event) {
        event.preventDefault();
        setRequesting(true);
        request({
            description: filter.description.length
                ? filter.description
                : undefined,
            technologyIds: filter.technologyIds.length
                ? filter.technologyIds
                : undefined,
            departmentId: filter.departmentId.length
                ? filter.departmentId
                : undefined,
            year: filter.year ? filter.year : undefined,
        })
            .then((r) => {
                setProjects(r.data);
            })
            .catch((e) => {
                toast.error("Error Filtering");
            })
            .finally(() => {
                setRequesting(false);
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
                                value={filter.description}
                                name="description"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-12 mb-3">
                            <Select
                                name="technologyIds"
                                options={techs}
                                isMulti
                                onChange={onSelectHandler}
                                placeholder="Select technologies"
                            />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-12 mb-3">
                            <Select
                                name="departmentId"
                                options={dep}
                                // isMulti
                                onChange={onSelectHandler}
                                placeholder="Select Departments"
                            />
                        </div>
                        {year !== false && (
                            <div className="col-sm-6 col-md-3 col-lg-12 mb-3">
                                <Select
                                    name="year"
                                    options={years}
                                    onChange={onSelectHandler}
                                    placeholder="Select a year"
                                />
                            </div>
                        )}
                        <div className="col-sm-6 col-md-1 col-lg-12">
                            <SpinnerButton
                                className="btn btn-outline-light w-100"
                                onClick={onSubmit}
                                loading={requesting}
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
