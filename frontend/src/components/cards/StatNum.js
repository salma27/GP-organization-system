import React from 'react';
import { VscSymbolNumeric } from "react-icons/vsc";
import "./../../css/adminStat.css";

const StatNum = (props) => {
    return ( 
        <div className="statNum-board" style={{ }}>
            {/* <div className="col-12 col-lg-9 personinfo-body" style={{}}>
                {data.map((item,index) => <NumIfnfo key={index} printNum={item.numOfDr} printMassage={`Number Of ${item.department} Doctors`}/>)}
                <hr className="w-100"/>
                <NumIfnfo printMassage="Number Of Doctors" printNum="100" />

            </div> */}
            <div>
                <label className="stat-label mr-1">{props.head}</label>
                <VscSymbolNumeric />
            </div>

            <h3 className="stat-num-header">100</h3>
            <hr />
            <div className="row">
                {props.data.map((item,index) => <div className="col-6" key={index}>
                    <>
                        <div>
                            <label className="stat-label mr-1">{item.department}</label>
                            <VscSymbolNumeric />
                        </div>

                        {props.head==="Doctors" ? 
                            <h3 className="stat-num">{item.numOfDr}</h3>:
                            props.head === "Students" ? <h3 className="stat-num">{item.numOfStud}</h3> :
                            <h3 className="stat-num">{item.numOfTAS}</h3>
                        }
                    </>
                </div>)}


            </div>

        </div>
    );
}
 
export default StatNum;