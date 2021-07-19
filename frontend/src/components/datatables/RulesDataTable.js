import React, { useState } from "react";
import { DataTable } from "utils";
import { useDepartments, useRequest } from "hooks";
import { adminDeleteDepartment } from "requests";
import { toast } from "react-toastify";
import { AddDepartmentRow ,EditOldProjectRow} from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

    // const data1 = [
    //     ["CS", "3", "5", "1", "2", "1", "1"],
    //     ["IS", "2", "5", "1", "2", "1", "1"],
    //     ["IT", "4", "5", "1", "2", "1", "1"],
    //     ["DS", "1", "5", "2", "3", "1", "1"],
    // ];
    const columns = [
        { name: "name", label:"Department", options: { filterType: "checkbox" } },
        { name: "minNumberOfStudents", label:"Min students per team" },
        { name: "maxNumberOfStudents", label:"Max students per team" },
        { name: "minNumberOfSupervisors", label:"Min supervisors to supervise" },
        { name: "maxNumberOfSupervisors", label:"Max supervisors to supervise" },
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
                            /*() => setState((oldArray) => [...oldArray, tmp])*/
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
                    {/* {showEditModal && 
                        <EditOldProjectRow
                        show={showEditModal}
                        hide={() => setShowEditModal(false)}
                        columns={columns}
                        row={editIndex}
                        departments={departments}
                        tech={Technologies}
                        btn="Edit Row"
                    />} */}
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
                deleteRequest({departmentId:data[rowsDeleted.data[key].dataIndex].id})
                .then((res)=>{
                    toast.success(res.data);
                    window.location.reload();
                })
                .catch(err=>{
                    toast.error("can't delete department")
                })
            }
            // console.log(rowsDeleted, "were deleted!");
        },
    };

    return (
        <>
            <DataTable title={"Students List"} loading={loading} data={data} columns={columns} options={options}/>
        </>
    );
}

export default RulesDataTable;
