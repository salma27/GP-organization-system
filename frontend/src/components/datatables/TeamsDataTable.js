import { React, useState } from "react";
import data from "components/data";
import { DataTable } from "utils";
import { IconButton } from "@material-ui/core";
import { createTheme, createMuiTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MUIDataTable from "mui-datatables";

function TeamsDataTable() {
    const [state, setState] = useState(data);
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
            },
        },
        {
            name: "name",
            label: "Name",
            options: {
                filterType: "textField",
            },
        },
        {
            name: "email",
            label: "Mail",
            options: {
                filterType: "textField",
            },
        },
        {
            name: "major",
            label: "Department",
            options: {
                filterType: "checkbox",
            },
        },
        {
            name: "gpa",
            label: "GPA",
            options: {
                filter: false,
            },
        },
        {
            name: "team",
            label: "Team",
            options: {
                filterType: "multiselect",
            },
        },
        /*{
            name: "Delete",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                            onClick={() => {
                                const tmpData = state;

                                setState(tmpData.shift());
                            }}
                        >
                            <DeleteIcon />
                        </button>
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
                        <EditIcon>
                            <button
                                onClick={() =>
                                    window.alert(
                                        `Clicked "Edit" for row ${tableMeta.rowIndex}`
                                    )
                                }
                            ></button>
                        </EditIcon>
                    );
                },
            },
        },*/
    ];

    /*const getMuiTheme = () =>
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
*/
    const options = {
        selectableRows: "multiple",
        draggableColumns: { enabled: true },
        jumpToPage: true,
        //indexColumn: "index",
        hasIndex: true,
        //customAction: action,
        /* responsive: "stacked",
        page: 2,
        customToolbar: () => {
            return (
                <IconButton style={{ order: -1 }}>
                    <AddIcon />
                </IconButton>
            );
        },*/
    };
    return (
        <>
            {/*<MuiThemeProvider theme={getMuiTheme()}>*/}
            <MUIDataTable
                options={options}
                title="Teams List"
                data={state}
                columns={columns}
            />
            {/*</MuiThemeProvider>*/}
        </>
    );
}

export default TeamsDataTable;
