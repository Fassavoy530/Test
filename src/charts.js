import React from "react";
import { scaleLinear, scaleBand, max, mean } from "d3";

function SymmetricBarChart(props) {
    const { offsetY, data, height, width, selectedCountry, selectedContinent, mouseOver, mouseOut, onclick} = props;
    const obesity_mean = mean(data,d => d.ObesityRate);
    const casefatality_mean = mean(data,d => d.CaseFatalityRate);
    const axis_gap = 70;
    const xscale = scaleBand().range([0,width-20]).domain(data.map(d=>d.Country));
    const upper_yscale = scaleLinear().domain([0, max(data,d => d.CaseFatalityRate)]).range([height/2 , 0]);
    const lower_yscale = scaleLinear().domain([0, max(data,d => d.ObesityRate)]).range([axis_gap, height/2 + axis_gap]);
    const upper_ticks = upper_yscale.ticks(6);
    const lower_ticks = lower_yscale.ticks(6).reverse();
    const upper_getColor = (d) => {
        if (d.Country === selectedCountry) {
            return 'red'
        }
        else{
            return '#fc8d59'
        }
    }
    const lower_getColor = (d) => {
        if (d.Country === selectedCountry) {
            return 'steelblue'
        }
        else{
            return '#99d594'
        }
    }

    if (selectedContinent == 'All'){
        var continent = 'Global';
    } else if (selectedContinent != null){
        var continent = selectedContinent;
    } else{
        var continent = 'Global';
    }

    return <g transform={`translate(${25}, ${offsetY})`} >
        <line x1={0} x2={0} y1={0} y2={height + axis_gap} stroke={'black'} />
        <g>
        <line x1={0} x2={width} y1={upper_yscale(casefatality_mean)} y2={upper_yscale(casefatality_mean)} stroke={'grey'} strokeDasharray="4"/>
        <text transform={`translate(${width+35}, ${upper_yscale(casefatality_mean)-15})`} style={{ textAnchor:'end', fontSize:'12px'}}>
                        {continent}
                    </text>
        <text transform={`translate(${width+35}, ${upper_yscale(casefatality_mean)})`} style={{ textAnchor:'end', fontSize:'12px'}}>
                        Average:
                    </text>
        <text transform={`translate(${width+35}, ${upper_yscale(casefatality_mean)+15})`} style={{ textAnchor:'end', fontSize:'12px'}}> {Number(casefatality_mean).toFixed(2)}
                    </text>
        <line x1={0} x2={width} y1={height/2 + lower_yscale(obesity_mean)} y2={height/2 + lower_yscale(obesity_mean)} stroke={'grey'} strokeDasharray="4"/>
        <text transform={`translate(${width+35}, ${height/2 + lower_yscale(obesity_mean)-15})`} style={{ textAnchor:'end', fontSize:'12px'}}>
                        {continent}  
                    </text>
        <text transform={`translate(${width+35}, ${height/2 + lower_yscale(obesity_mean)})`} style={{ textAnchor:'end', fontSize:'12px'}}>
                        Average:
                    </text>
        <text transform={`translate(${width+35}, ${height/2 + lower_yscale(obesity_mean)+15})`} style={{ textAnchor:'end', fontSize:'12px'}}>
                        {Number(obesity_mean).toFixed(2)}
                    </text>
        </g>
        <g transform={`translate(${0}, ${0})`}><text>COVID-19 Case-Fatality Rate(%)</text></g>
        <g transform={`translate(${0}, ${height + axis_gap + 20})`}><text>Obesity Rate(%)</text></g>
        {upper_ticks.map( tickValue => {
                return <g key={tickValue} transform={`translate(-5, ${upper_yscale(tickValue)})`}>
                    <line x1={0} x2={5} stroke={'black'} />
                    <text style={{ textAnchor:'end', fontSize:'13px'}}>
                        {tickValue}
                    </text>
                </g>
            })
        }
        {lower_ticks.map( tickValue => {
                return <g key={tickValue} transform={`translate(-5, ${lower_yscale(tickValue)+height/2})`}>
                    <line x1={0} x2={5} stroke={'black'} />
                    <text style={{ textAnchor:'end', fontSize:'13px'}}>
                        {tickValue}
                    </text>
                </g>
            })
        }

        {data.map(d => {
            return <rect key={d.Country} x={xscale(d.Country)} y={upper_yscale(d.CaseFatalityRate)} 
            height={height/2-upper_yscale(d.CaseFatalityRate)} width={xscale.bandwidth()} 
            fill={upper_getColor(d)} stroke={'black'} strokeWidth={'1'}
            onClick={()=>onclick(d)}
            onMouseEnter={(event)=>{mouseOver(d, event)}} onMouseOut={mouseOut} />
        })}

        {data.map(d => {
            return <rect key={d.Country} x={xscale(d.Country)} y={height/2 + axis_gap} 
            height={lower_yscale(d.ObesityRate)-axis_gap} width={xscale.bandwidth()} 
            fill={lower_getColor(d)} stroke={'black'} strokeWidth={'1'}
            onClick={()=>onclick(d)}
            onMouseEnter={(event)=>{mouseOver(d, event)}} onMouseOut={mouseOut}/>
        })}

        
        {xscale.domain().map(country => {
                return <g key={country} transform={`translate(${xscale(country)+10}, ${height/2 + 35})`}>
                    <text transform={`rotate(-80)`} style={{textAnchor:'middle', fontSize:'10px', fontWeight: 'bold'}}>
                        {country}
                    </text>
                </g>
        })}

        
    </g>
}

export {SymmetricBarChart}

