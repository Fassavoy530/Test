import React from "react";
// import { SymmetricAreaChart } from "./charts";

export function Tooltip(props) {
    const {d, left, top} = props;
    if (left === null) {
        return <div></div>;
    } else if (d.Value != undefined) {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            width: "150px",
            height: "90px",
            padding: "2px",
            fontSize: "11px",
            font: "Comic Sans MS",
            background: "lightgreen",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: `${left-160}px`,
            top: `${top-100}px`,
            opacity: '1',
        };
        return <div style={divStyle} >
            <p style={{fontFamily:"Comic Sans MS", fontSize: "11px"}}>Country: {d.Country}</p>
            <li>Protein Source: {d.ProteinSource}</li>
            <li>Exact Value: {d.Value}%</li>
            </div>
    } else {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            width: "150px",
            height: "80px",
            padding: "2px",
            fontSize: "11px",
            font: "Comic Sans MS",
            background: "lightgreen",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: `${left-160}px`,
            top: `${top-100}px`,
            opacity: '1',
        };
        
        return <div style={divStyle} >
            <p style={{fontFamily:"Comic Sans MS", fontSize: "11px"}}>Country: {d.Country}</p>
            <li>Case-Fatality Rate: {d.CaseFatalityRate}</li>
            <li>Obesity Rate: {d.ObesityRate}% </li>
            </div>
    };  
}