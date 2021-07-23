import { React, useState, useEffect} from "react";
import {useRequest, useDepartments, useTechnology} from "hooks";
import { adminGetCurrentProjects } from "requests";
import { DataTable } from "utils";
import { toast } from "react-toastify";

function CurrentProjectsTable() {
    const [data,setData] = useState([]);
    const [request,requesting] = useRequest(adminGetCurrentProjects);
    const [filterList,setFilterList] = useState([]);
    const [filterObject,setFilterObj] = useState([]);

    useEffect(() => {
        request({})
            .then((res) =>{ 
                setData(res.data)})
            .catch((err) => toast.error("Could not get current projects"))
    }, [])

    useEffect(() => {
        let temp = [];
        let temObj = [];
        data.map((item)=>{
            item.technologies.map((tech)=>{
                if(!temp.includes(tech.name)){
                    temp.push(tech.name);
                    temObj.push(tech);
                }
            })
        })
        setFilterList(temp);
        setFilterObj(temObj);
    }, [data])

    const columns = [
        {
            name: "title",
            label: "Name",
            options: {
                filterType: "textField",
            },
        },
        {
            name:"description",
            label: "Description",
            options: {
                filter: false,
            },
        },
        {
            name:"departmentId",
            label: "Department",
            options: {
                filterType: "checkbox",
            },
            
        },
        {
            name: "technologyIds",
            label:"Technologies",
            options: {
                filter: true,
                sort: false,
                empty: true,
                // filterType: 'custom',
                customBodyRender: 
                (value, tableMeta, updateValue) => {
                    // console.log(tableMeta.rowIndex);
                    return (
                        <div>{value && value.map((v,i)=> data[tableMeta.rowIndex].technologies[i].name + ", ")}</div>
                    );
                },
                
                filterOptions: {
                    renderValue: val => {
                        return filterObject.map(tech=>{
                            if(tech.id===val)
                                return tech.name
                        })
                    }
                },
                // filterList: ['Business Analyst',"sara"],

                
            },
        },
        
    ];

    const options = {
        selectableRows: "none",
        draggableColumns: { enabled: true },
        jumpToPage: true,
        // responsive: 'stacked',
        //indexColumn: "index",
        
        hasIndex: true,
        // onFilterChange: (columnChanged, filterList) => {
        //     console.log(filterList);
        //     console.log(`onFilterChange columnChanged: ${columnChanged}`);
        //     console.log(`filterList[0]: ${JSON.stringify(filterList[0])}`);
        //     // const data = [];
        //     // this.setState({ data });
        //   }
    };

    return (
        <>
            <DataTable
                options={options}
                loading={requesting}
                title="Current Projects List"
                data={data}
                columns={columns}
            />
        </>
    );
}

export default CurrentProjectsTable;
