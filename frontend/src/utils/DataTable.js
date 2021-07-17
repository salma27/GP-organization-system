import React from "react";
import MUIDataTable from "mui-datatables";

const Progress = () => {
    return (
        <tbody>
            <tr>
                <td colSpan="100%" className="py-3">
                    <div className="d-flex justify-content-center mt-3 w-100">
                        <div
                            className="spinner-border  text-primary"
                            role="status"
                        ></div>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

const DataTable = ({
    options = {},
    columns = [],
    data = [],
    loading = false,
    components = {},
}) => {
    const _options = {
        filter: true,
        filterType: "multiselect",
        selectableRows: "none",
        rowsPerPageOptions: [20, 60, 100, 150],
        rowsPerPage: 15,
        ...options,
    };
    const _components = loading ? { TableBody: Progress } : {};
    return (
        <MUIDataTable
            data={data}
            columns={columns}
            options={_options}
            components={{ ..._components, ...components }}
        />
    );
};
export default DataTable;
