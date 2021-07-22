import { React, useState, useEffect } from "react";
import data from "components/data";
import { DataTable } from "utils";
import { IconButton } from "@material-ui/core";
import { createTheme, createMuiTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import AddDatatableRow from "components/Modals/AddDatatableRow";
import { useRequest } from "hooks";
import { adminGetTeams } from "requests";
import { toast } from "react-toastify";

function TeamsDataTable() {
    // const [state, setState] = useState(data);
    const [request,requesting] = useRequest(adminGetTeams);
    const [showModal, setShowModal] = useState(false);
    const [data,setData] = useState([])

    useEffect(() => {
        let temp = [];
        request({})
            .then(res=>{
                // setData(res.data);
                
                res.data.map((row,i)=>{
                    // let studIds = [];
                    // let stud = [];
                    // let departmet =row.students ? row.students[0].departmentId:"";
                    // let dr =[];
                    // let ta = [];
                    // let mainProject = row.mainProject;
                    // row.students.map(ele=>{
                    //     stud.push(ele.name);
                    //     studIds.push(ele.ecomId);
                    // })
                    // row.supervisors.forEach(ele=>{
                    //     if (ele.type == 0)
                    //         dr.push(ele.name);
                    //     else
                    //         ta.push(ele.name)
                    // })
                    // temp.push({mainProject:mainProject,studentsIds:studIds,students:stud,doctors:dr,tas:ta,departmet:departmet})
                    
                    let dr =[];
                    let ta = [];
                    let mainProject = row.mainProject;

                    row.supervisors.forEach(ele=>{
                        if (ele.type == 0)
                            dr.push(ele.name);
                        else
                            ta.push(ele.name)
                    })
                    row.students.map(ele=>{
                        let studIds = ele.ecomId;
                        let studName = ele.name;
                        let departmet = ele.departmentId;
                        temp.push({id:i+1,mainProject:mainProject,studentsIds:studIds,students:studName,doctors:dr,tas:ta,departmet:departmet})
                    })
                    
                })
                setData(temp);
                console.log("llll",temp);
            })
            .catch(error => toast.error("couldn't get teams"))
    }, [])

    const columns = [
        { name: "id", label: "Team Number", options: { filter: false, }, },
        { name: "mainProject", label: "Main Project", options: { filterType: "textField", }, },
        { name: "studentsIds", label: "Students ID",
            options: {
                filterType: "textField",
            },
            // customBodyRender: (value, tableMeta, updateValue) => {
            //     return (
            //         <div>{value && value.map((v,i)=> v + " , "  )}</div>
            //     );
            // },
        },
        { name: "students", label: "Students",
            options: {
                filterType: "textField",
                // customBodyRender: (value, tableMeta, updateValue) => {
                //     return (
                //         <div>{value && value.map((v,i)=> v + " - ")}</div>
                //     );
                // },
            },
        },
        {
            name: "doctors",
            label: "Doctors",
            options: {
                filter: true,
                sort:true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>{value && value.map((v,i)=> v + ", ")}</div>
                    );
                },
            },
        },
        {
            name: "tas",
            label: "Teaching Assistant",
            options: {
                filter: "textField",
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>{value && value.map((v,i)=> v + ", ")}</div>
                    );
                },
            },
        },
        {
            name: "departmet",
            label: "Departmet",
            options: {
                filterType: "multiselect",
            },
        },
        // {
        //     name: "project",
        //     label: "Project",
        //     options: {
        //         filterType: "textField",
        //     },
        // },
        {
            name: "Edit",
            options: {
                filter: false,
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

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MUIDataTableToolbar: {
                    actions: {
                        display: "flex",
                        flexDirection: "row",
                        flex: "initial",
                    },
                },
            },
        });

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
            const tmp = [
                "20170115",
                "Salma Essam",
                "s@gmail.com",
                "CS",
                "3.2",
                "33",
            ];
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
                    <AddDatatableRow
                        show={showModal}
                        hide={() => setShowModal(false)}
                        columns={columns}
                        btn="Add New Row"
                    />
                </>
            );
        },
    };

    return (
        <>
            {/* <MuiThemeProvider theme={getMuiTheme()}> */}
                <DataTable
                    options={options}
                    title="Teams List"
                    loading={requesting}
                    data={data}
                    columns={columns}
                />
            {/* </MuiThemeProvider> */}
        </>
    );
}

export default TeamsDataTable;
