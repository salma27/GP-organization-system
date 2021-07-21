import React, {useEffect, useState} from "react";
import { DataTable } from "utils";
import { useRequest } from "hooks";
import { adminGetDoctors, adminDeleteStaff } from "requests";
import { toast } from "react-toastify";
import { AddStaffRow } from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { adminAddDoctor } from "requests";

const columns = [
    // { name: "id", options: { display: "excluded", filter: false } },
    { name: "name", label:"Name", options: { filterType: "textField" } },
    { name: "ecomId", label:"ECom ID", options: { filterType: "textField" } },
    { name: "password", label:"password", options: { display: "excluded", filter: false } },
    { name: "department", label:"Department", options: { filterType: "checkbox" } },
    // { name: "GPA", options: { display: "excluded", filter: false } },
    { name: "teamsSlots", label:"Team Of Slots", options: { filter: true } },
    { name: "teams", label:"Teams Taken",
        options: { 
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div>{value && value.map((v,i)=> v + ", ")}</div>
                );
            },
        } ,
    },
    { name: "bio", options: { display: "excluded", filter: false } },
    { name: "technologies", options: { display: "excluded", filter: false } },
];

function DoctorsDataTable() {
    const [request,requesting] = useRequest(adminGetDoctors);
    const [deleteRequest, DeleteRequesting] = useRequest(adminDeleteStaff);
    const [data,setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


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
                            btn="Add New Doctor"
                            title="Add New Doctor"
                            request={adminAddDoctor}
                            row={{technologies:[]}}
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
                deleteRequest({ecomId:data[rowsDeleted.data[key].dataIndex].ecomId})
                .then((res)=>{
                    toast.success(res.data.message);
                    window.location.reload();
                })
                .catch(err=>{
                    toast.error("can't delete")
                })
            }
            // console.log(rowsDeleted, "were deleted!");
        },
    };

    useEffect(() => {
        request()
            .then(response=>{
                // console.log(response.data.supervisors);
                setData(response.data.supervisors)
            })
            .catch(error=>{
                toast.error("Couldn't get doctors");
            })
    }, [])

    return (
        <>
            <DataTable loading={requesting} options={options} title={"Doctors List"} data={data} columns={columns} />
        </>
    );
}

export default DoctorsDataTable;
