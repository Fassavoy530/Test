import React from "react";
import { interpolateOranges, interpolatePurples, scaleBand, min, max, median, quantile} from "d3";
import { Scales } from "./scales";
import { Legend } from "./legend"

function HeatMap(props) {
    const {data, offsetX, offsetY, height, width, selectedCountry, setSelectedCountry, mouseOver, mouseOut} = props;
    const country = (data.map(d => d.Country));
    const protein_source = ['AlcoholicBeverages', 'AnimalFats', 'AnimalProducts', 'AquaticProducts', 'Cereals', 'Eggs', 'Fruits', 'Meat', 'Milk', 'Miscellaneous', 
'Offals', 'Oilcrops', 'Pulses', 'Seafood', 'Spices', 'StarchyRoots', 'Stimulants', 'SugarCrops', 'SugarSweeteners', 'Treenuts', 'VegetableOils', 'Vegetables', 'VegetalProducts']
    const xscale = scaleBand().range([0,width-100]).domain(country);
    const yscale = scaleBand().range([0,height-80]).domain(protein_source);
    const startRange = [min(data, d => d.Value), 25, max(data, d => d.Value)];
    const colormap = Scales.colorSequential(startRange, interpolatePurples)
    const colormap_2 = Scales.colorSequential(startRange, interpolateOranges)
    const grid_getColor = (d) => {
        if (d.Country === selectedCountry) {
            return colormap_2(d.Value)
        }
        else{
            return colormap(d.Value)
        }
    }

    return <svg height={height+200} width={width}>
        <g transform={`translate (${offsetX+30}, ${offsetY+30})`}> 
            {data.map(d =>
                <g transform={`translate (${xscale(d.Country)}, ${yscale(d.ProteinSource)})`}>
                    <rect width={xscale.bandwidth()} height={yscale.bandwidth()} fill={grid_getColor(d)} stroke={"white"} strokeWidth={"0.5"}
                    onMouseEnter={(event)=>{mouseOver(d, event)}} onMouseOut={mouseOut}></rect>
                </g>
            )} 
            {country.map(c => {
                            return <g transform={`translate(${xscale(c)+5},-8)rotate(60)`}>
                            <text style={{textAnchor:'end', fontSize:'8px'}}>{c}</text>
                            </g>
                        })}
            {protein_source.map(p => {
                        return <g transform={`translate(${-35},${yscale(p)+10})`}>
                            <text  style={{textAnchor:'middle', fontSize:'8px', fontWeight: 'bold'}} >{p}</text>
                        </g>
                    })}
            <Legend x={0} y={height-70} width={width/2} height={10} numberOfTicks={10} 
        rangeOfValues={[min(data, d => d.Value), max(data, d => d.Value)]} colormap={colormap}></Legend>
        </g>
    </svg>
}

export {HeatMap}