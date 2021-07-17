import { React} from "react";
import { createTheme } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";

function CurrentProjectsTable() {
    const columns = [
        {
            name: "title",
            label: "Name",
            options: {
                filterType: "textField",
            },
        },
        {
            name:"brief_description",
            title: "Description",
            options: {
                filter: false,
            },
        },
        {
            name:"department",
            title: "Department",
            options: {
                filterType: "checkbox",
            },
        },
        {
            name: "tech",
            label:"Technologies",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>{value && value.map((v)=> v + ", ")}</div>
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
        selectableRows: "none",
        draggableColumns: { enabled: true },
        jumpToPage: true,
        //indexColumn: "index",
        hasIndex: true,
    };

    const data = [
        {
            title: "Tbdel",
            department:"CS",
            year:"2021",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["ML", "Web development", "Mobile app development"],
        },
        {
            title: "GP organizer",
            department:"IS",
            year:"2021",
            brief_description:
                "A faculty platformfor student to register their ideas and form teams on",
            tech: ["ML", "Web development", "Mobile app development"],
        },
        {
            title: "Gold digger",
            department:"CS",
            year:"2021",
            brief_description: "a gold stock pridector using ML",
            tech: ["ML", "Web development"],
        },
        {
            title: "Tbdel",
            department:"DS",
            year:"2021",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["Mobile app development"],
        },
        {
            title: "Gold digger",
            department:"IS",
            year:"2021",
            brief_description:
                "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
        },
        {
            title: "GP organizer",
            department:"IT",
            year:"2021",
            brief_description:
                "A faculty platformfor student to register their ideas and form teams on",
            tech: ["ML", "Web development"],
        },
        {
            title: "GP organizer",
            department:"CS",
            year:"2021",
            brief_description:
                "A faculty platformfor student to register their ideas and form teams on",
            tech: ["ML", "Web development", "Mobile app development"],
        },
        {
            title: "GP organizer",
            department:"DS",
            year:"2021",
            brief_description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
        },
    ];

    return (
        <>
            {/* <MuiThemeProvider theme={getMuiTheme()}> */}
                <MUIDataTable
                    options={options}
                    title="Current Projects List"
                    data={data}
                    columns={columns}
                />
            {/* </MuiThemeProvider> */}
        </>
    );
}

export default CurrentProjectsTable;
