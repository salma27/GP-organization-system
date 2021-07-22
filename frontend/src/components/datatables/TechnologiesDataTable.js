import React, { useState, useEffect } from "react";
import { DataTable } from "utils";
import { useDepartments, useRequest, useTechnology } from "hooks";
import { adminDeleteDepartment, getAllTechnologies } from "requests";
import { toast } from "react-toastify";
import { AddDepartmentRow ,EditDepartmentRow} from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

function TechnologiesDataTable() { 
    const [deleteRequest,deleteRequesting] = useRequest(adminDeleteDepartment);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editRow,setEditRow] = useState({});
    const [request,requesting] = useRequest(getAllTechnologies);
    const [data,setData] = useState([]);

    useEffect(() => {
        request()
            .then((r) => {
                setData(r.data);
            })
            .catch((e) => {
                toast.error("Error getting technologies");
            });
    }, [])

    const columns = [
        { name: "id", label:"Technology ID", options: { filterType: "textField" } },
        { name: "name", label:"Technology Name", options: { filterType: "textField" } },
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
            <DataTable title={"Technologies List"} loading={requesting} data={data} columns={columns} options={options}/>
        </>
    );
}

export default TechnologiesDataTable;
