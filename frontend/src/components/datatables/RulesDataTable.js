import React, { useState } from "react";
import { DataTable } from "utils";
import { useDepartments, useRequest } from "hooks";
import { adminDeleteDepartment } from "requests";
import { toast } from "react-toastify";
import { AddDepartmentRow ,EditDepartmentRow} from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

/*
const columns = [
    { name: "ID", options: { filter: "textfield" } },
    { name: "Name", options: { filter: "textfiled" } },
    { name: "Mail", options: { filter: "textfiled" } },
    { name: "Major", options: { filterType: "checkbox" } },
    { name: "GPA", options: { filter: false } },
    { name: "Team", options: { filterType: "multiselect" } },
];
*/
function RulesDataTable() { 
    const [data,loading] = useDepartments();
    const [deleteRequest,deleteRequesting] = useRequest(adminDeleteDepartment);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editRow,setEditRow] = useState({});

    // const data1 = [
    //     ["CS", "3", "5", "1", "2", "1", "1"],
    //     ["IS", "2", "5", "1", "2", "1", "1"],
    //     ["IT", "4", "5", "1", "2", "1", "1"],
    //     ["DS", "1", "5", "2", "3", "1", "1"],
    // ];
    const columns = [
        { name: "name", label:"Department", options: { filterType: "multiselect" } },
        { name: "minNumberOfStudents", label:"Min students per team" },
        { name: "maxNumberOfStudents", label:"Max students per team" },
        { name: "minNumberOfSupervisors", label:"Min supervisors to supervise" },
        { name: "maxNumberOfSupervisors", label:"Max supervisors to supervise" },
        { name: "Edit",options: {filter: false, sort: false, empty: true,
            customBodyRender: (value, tableMeta, updateValue,) => {
                return (
                    <>
                        <IconButton
                            style={{ order: -1 }}
                            onClick={() =>{
                                setEditRow(data[tableMeta.rowIndex])
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
        hasIndex: true,
        customToolbar: () => {

            return (
                <>
                    <IconButton
                        style={{ order: -1 }}
                        onClick={
                            () => setShowAddModal(true)
                        }
                    >
                        <AddIcon />
                    </IconButton>
                    {showAddModal && 
                        <AddDepartmentRow
                            show={showAddModal}
                            hide={() => setShowAddModal(false)}
                            columns={columns}
                            btn="Add New Department"
                        />
                    }
                    {showEditModal && 
                        <EditDepartmentRow
                            show={showEditModal}
                            hide={() => setShowEditModal(false)}
                            columns={columns}
                            row={editRow}
                            btn="Edit Department"
                        />
                    }
                </>
            );
        },
        onRowsDelete: (rowsDeleted) => {
            for (var key in rowsDeleted.data) {
                deleteRequest({departmentId:data[rowsDeleted.data[key].dataIndex].id})
                .then((res)=>{
                    toast.success(res.data.message);
                    window.location.reload();
                })
                .catch(err=>{
                    toast.error("can't delete department")
                })
            }
        },
    };

    return (
        <>
            <DataTable title={"Departments List"} loading={loading} data={data} columns={columns} options={options}/>
        </>
    );
}

export default RulesDataTable;
