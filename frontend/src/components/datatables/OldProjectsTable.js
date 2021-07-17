import React, { useState, useEffect } from "react";
import { adminOldProjectsRequest } from "requests";
import { useAuthContext, useRequest, useValidation } from "hooks";
import { IconButton } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MUIDataTable from "mui-datatables";
import { AddProjectRow } from "components/Modals";
import {DataTable} from "utils";
import { toast } from "react-toastify";

function OldProjectsTable() {
    // const [state, setState] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [data,setData] = useState([])
    const [request, requesting] = useRequest(adminOldProjectsRequest);

    useEffect(() => {
        request({})
            .then((r) => console.log(r.data))
            .catch(e => toast.error("Couldn't get old projects"))
    }, [])

    const columns = [
        {
            name: "title",
            label: "Name",
            options: {
                filterType: "textField",
            },
        },
        {
            name: "year",
            label: "Year",
            options: {
                filter: true,
            },
        },
        {
            name: "brief_description",
            title: "Description",
            options: {
                filter: false,
            },
        },
        {
            name: "department",
            title: "Department",
            options: {
                filterType: "checkbox",
            },
        },
        {
            name: "tech",
            label: "Technologies",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>{value && value.map((v) => v + ", ")}</div>
                    );
                },
            },
        },
        {
            name: "Edit",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <IconButton
                            style={{ order: -1 }}
                            onClick={() =>
                                window.alert(
                                    `Clicked "Edit" for row ${tableMeta.rowIndex}`
                                )
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    );
                },
            },
        },
    ];

    

    const options = {
        selectableRows: "multiple",
        draggableColumns: { enabled: true },
        jumpToPage: true,
        //indexColumn: "index",
        hasIndex: true,
        //customAction: action,
        //responsive: "stacked",
        //page: 2,
        customToolbar: () => {

            return (
                <>
                    <IconButton
                        style={{ order: -1 }}
                        onClick={
                            () => setShowModal(true)
                            /*() => setState((oldArray) => [...oldArray, tmp])*/
                        }
                    >
                        <AddIcon />
                    </IconButton>
                    <AddProjectRow
                        show={showModal}
                        hide={() => setShowModal(false)}
                        columns={columns}
                        btn="Add New Row"
                    />
                </>
            );
        },
    };

    // const data = [
    //     {
    //         title: "Tbdel",
    //         department: "CS",
    //         year: "2021",
    //         brief_description:
    //             "an online platform that people can exchange their old items together on",
    //         tech: ["ML", "Web development", "Mobile app development"],
    //     },
    //     {
    //         title: "GP organizer",
    //         department: "IS",
    //         year: "2021",
    //         brief_description:
    //             "A faculty platformfor student to register their ideas and form teams on",
    //         tech: ["ML", "Web development", "Mobile app development"],
    //     },
    //     {
    //         title: "Gold digger",
    //         department: "CS",
    //         year: "2021",
    //         brief_description: "a gold stock pridector using ML",
    //         tech: ["ML", "Web development"],
    //     },
    //     {
    //         title: "Tbdel",
    //         department: "DS",
    //         year: "2021",
    //         brief_description:
    //             "an online platform that people can exchange their old items together on",
    //         tech: ["Mobile app development"],
    //     },
    //     {
    //         title: "Gold digger",
    //         department: "IS",
    //         year: "2021",
    //         brief_description:
    //             "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
    //     },
    //     {
    //         title: "GP organizer",
    //         department: "IT",
    //         year: "2021",
    //         brief_description:
    //             "A faculty platformfor student to register their ideas and form teams on",
    //         tech: ["ML", "Web development"],
    //     },
    //     {
    //         title: "GP organizer",
    //         department: "CS",
    //         year: "2021",
    //         brief_description:
    //             "A faculty platformfor student to register their ideas and form teams on",
    //         tech: ["ML", "Web development", "Mobile app development"],
    //     },
    //     {
    //         title: "GP organizer",
    //         department: "DS",
    //         year: "2021",
    //         brief_description:
    //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
    //     },
    // ];
    

    return (
        <>
            <DataTable 
                options={options}
                loading={requesting}
                title="Old Projects List"
                data={data}
                columns={columns}
            /> 
        </>
    );
}

export default OldProjectsTable;
