import React, { useState, useEffect } from "react";
import { DataTable } from "utils";
import { adminGetStudents } from "requests";
import { useRequest } from 'hooks';
import { toast } from "react-toastify";
import { AddStaffRow } from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { adminAddStudent } from "requests";

const columns = [
    { name: "ecomId", label:"Ecom ID", options: { filterType: "textField" } },
    { name: "name", label:"Name", options: { filterType: "textField" } },
    { name: "password", label:"password", options: { display: "excluded", filter: false } },
    { name: "departmentId", label:"Department", options: { filterType: "checkbox" } },
    // { name: "GPA", options: { filter: false } },
    { name: "teamId", label: "Team ID", options: { filterType: "multiselect" } },
    { name: "bio", label:"bio", options: { display: "excluded", filter: false } },
    // { name: "technologyIds", options: { display: "excluded", filter: false } },

    
];

function StudentsDataTable() {
    const [request,requesting] = useRequest(adminGetStudents);
    // const [deleteRequest, DeleteRequesting] = useRequest();
    const [data,setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        request({})
            .then(response=>{
                // console.log(response.data);
                setData(response.data.students)
            })
            .catch(error=>{
                toast.error("Couldn't get students");
            })
    }, [])

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
                        <AddStaffRow
                            show={showAddModal}
                            hide={() => setShowAddModal(false)}
                            columns={columns}
                            btn="Add New Student"
                            title="Add New Student"
                            request={adminAddStudent}
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
        // onRowsDelete: (rowsDeleted) => {
        //     for (var key in rowsDeleted.data) {
        //         deleteRequest({ecomId:data[rowsDeleted.data[key].dataIndex].ecomId})
        //         .then((res)=>{
        //             toast.success(res.data.message);
        //             window.location.reload();
        //         })
        //         .catch(err=>{
        //             toast.error("can't delete")
        //         })
        //     }
        //     // console.log(rowsDeleted, "were deleted!");
        // },
    };

    return (
        <>
            <DataTable title={"Students List"} loading={requesting} options={options} data={data} columns={columns} />
        </>
    );
}

export default StudentsDataTable;
