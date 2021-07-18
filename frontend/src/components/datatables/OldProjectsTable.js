import React, { useState, useEffect } from "react";
import { adminOldProjectsRequest, adminDeleteOldProjects } from "requests";
import { useAuthContext, useRequest, useValidation, useDepartments, useTechnology } from "hooks";
import { IconButton } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MUIDataTable from "mui-datatables";
import { AddOldProjectRow ,EditOldProjectRow} from "components/Modals";
import {DataTable} from "utils";
import { toast } from "react-toastify";

function OldProjectsTable() {
    // const [state, setState] = useState(data);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex,setEditIndex] = useState(-1);
    const [data,setData] = useState([])
    const [request, requesting] = useRequest(adminOldProjectsRequest);
    const [deleteRequest, DeleteRequesting] = useRequest(adminDeleteOldProjects);
    const [departments] = useDepartments();
    const [Technologies] = useTechnology();

    useEffect(() => {
        request({})
            .then((r) => setData(r.data))
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
            name: "description",
            title: "Description",
            options: {
                filter: false,
            },
        },
        {
            name: "departmentId",
            title: "Department",
            options: {
                filterType: "checkbox",
            },
        },
        {
            name: "technologyIds",
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
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue,) => {
                    return (
                        <>
                            <IconButton
                                style={{ order: -1 }}
                                onClick={() =>{
                                    setEditIndex(data[tableMeta.rowIndex])
                                    setShowEditModal(true);
                                   
                                    console.log(data[tableMeta.rowIndex]);
                                    // window.alert(
                                    //     `Clicked "Edit" for row ${tableMeta.rowIndex}`
                                    // )
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            
                            
                        </>
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
                            () => setShowAddModal(true)
                            /*() => setState((oldArray) => [...oldArray, tmp])*/
                        }
                    >
                        <AddIcon />
                    </IconButton>
                    {showAddModal && 
                    <AddOldProjectRow
                        show={showAddModal}
                        hide={() => setShowAddModal(false)}
                        columns={columns}
                        btn="Add New Row"
                        departments={departments}
                        tech={Technologies}
                    />}
                    {showEditModal && 
                        <EditOldProjectRow
                        show={showEditModal}
                        hide={() => setShowEditModal(false)}
                        columns={columns}
                        row={editIndex}
                        departments={departments}
                        tech={Technologies}
                        btn="Edit Row"
                    />}
                </>
            );
        },
        onRowsDelete: (rowsDeleted) => {
            for (var key in rowsDeleted.data) {
            //     this.removeItem(this.state.item_id[rowsDeleted.data[key].dataIndex])
            //         .then(res => {
            //             if (res != true) {
            //                 // ???
            //             }
            //     })
                deleteRequest({projectId:data[rowsDeleted.data[key].dataIndex].id})
                .then((res)=>{
                    toast.success(res.data);
                    window.location.reload();
                })
                .catch(err=>{
                    toast.error("can't delete")
                })
            }
            console.log(rowsDeleted, "were deleted!");
        },
    };

    const data1 = [
        {
            id:1,
            title: "Tbdel",
            departmentId: "CS",
            year: "2021",
            description:
                "an online platform that people can exchange their old items together on",
            technologyIds: ["ML", "Web development", "Mobile app development"],
        },
        {
            id:2,
            title: "GP organizer",
            departmentId: "IS",
            year: "2021",
            description:
                "A faculty platformfor student to register their ideas and form teams on",
            technologyIds: ["ML", "Web development", "Mobile app development"],
        },
        {
            id:3,
            title: "Gold digger",
            departmentId: "CS",
            year: "2021",
            description: "a gold stock pridector using ML",
            technologyIds: ["ML", "Web development"],
        },
        {
            id:4,
            title: "Tbdel",
            departmentId: "DS",
            year: "2021",
            description:
                "an online platform that people can exchange their old items together on",
            technologyIds: ["Mobile app development"],
        },
        {
            id:5,
            title: "Gold digger",
            departmentId: "IS",
            year: "2021",
            description:
                "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
        },
        {
            id:6,
            title: "GP organizer",
            departmentId: "IT",
            year: "2021",
            description:
                "A faculty platformfor student to register their ideas and form teams on",
            technologyIds: ["ML", "Web development"],
        },
        {
            id:7,
            title: "GP organizer",
            departmentId: "CS",
            year: "2021",
            description:
                "A faculty platformfor student to register their ideas and form teams on",
            technologyIds: ["ML", "Web development", "Mobile app development"],
        },
        {
            id:8,
            title: "GP organizer",
            departmentId: "DS",
            year: "2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
        },
    ];
    

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
