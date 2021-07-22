import React, { useState, useEffect } from "react";
import { DataTable } from "utils";
import { useDepartments, useRequest, useTechnology } from "hooks";
import { adminDeleteTechnology, getAllTechnologies, adminAddTechnology, adminEditTechnology} from "requests";
import { toast } from "react-toastify";
import { Technology } from "components/Modals";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

function TechnologiesDataTable() { 
    const [deleteRequest,deleteRequesting] = useRequest(adminDeleteTechnology);
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
                        <Technology
                            show={showAddModal}
                            hide={() => setShowAddModal(false)}
                            columns={columns}
                            btn="Add New Technology"
                            title="Add New Technology"
                            request={adminAddTechnology}
                            row={{}}
                        />
                    }
                    {showEditModal && 
                        <Technology
                            show={showEditModal}
                            hide={() => setShowEditModal(false)}
                            columns={columns}
                            row={{TechnologyId:editRow.id,...editRow}}
                            btn="Edit Technology"
                            title="Edit Technology"
                            request={adminEditTechnology}
                        />
                    }
                </>
            );
        },
        onRowsDelete: (rowsDeleted) => {
            for (var key in rowsDeleted.data) {
                deleteRequest({TechnologyId:data[rowsDeleted.data[key].dataIndex].id})
                .then((res)=>{
                    toast.success(res.data.message);
                    window.location.reload();
                })
                .catch(err=>{
                    toast.error("can't delete technology")
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
