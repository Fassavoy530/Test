import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { SymmetricBarChart } from "./charts";
import { Tooltip } from "./tooltip";
import { HeatMap } from "./heatmap";
import { PieChart } from "./piechart";
import { InstructionBox } from "./modal";
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const csvUrl = 'https://gist.githubusercontent.com/Fassavoy530/b2114435e08dd631fafd48341c962556/raw/8f7570283139d49d08aeee80e6c67302404af662/Infovis_dataset.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                for (const key in d){
                    if (isNaN(parseInt(d[key])) == false) {
                        d[key] = +d[key]
                    }
                }
            });
            setData(data);
        });
    }, []);
    return dataAll;
}


function Protein_Obesity_Covid(){
    const [continent, setCotinent] = React.useState(null);
    const [sort, setSort] = React.useState(null);
    const [selectedData, setSelectedData] = React.useState(null);
    const [selectedPieData, setSelectedPieData] = React.useState(null);
    const [selectedPieChart, setSelectedPieChart] = React.useState(null);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);

    const WIDTH = 1200;
    const HEIGHT = 800;
    const margin = { top: 30, right: 40, bottom: 30, left: 40, gap:40 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    
    const dataAll = useData(csvUrl);
    if (!dataAll) {
            return <pre>Loading...</pre>;
        };

    const handleContinentSelect=(event)=>{
        setCotinent(event);
      }
    const handleSortSelect=(event)=>{
        setSort(event);
    }
    var data = dataAll.filter( d => {
        if (continent == 'All') {
            return dataAll;
        }
        else if (continent != null) {
            return d.Continent === continent;
        }
        else {
            return dataAll;
        }
    });

    if (sort == 'Case-Fatality Rate') {
        var data = data.sort((a, b) => (a.CaseFatalityRate < b.CaseFatalityRate) ? 1 : -1)
    }
    else if (sort == 'Obesity Rate') {
        var data = data.sort((a, b) => (a.ObesityRate < b.ObesityRate) ? 1 : -1)
    }
    else {
        var data = data
    }


    // Process the data for heatmap 
    // {country: uganda, Nuts: 0.5, other: 0.8}
    // {country: uganda, ProteinSource: Nuts, value: 0.5}
    const protein_source = ['AlcoholicBeverages', 'AnimalFats', 'AnimalProducts', 'AquaticProducts', 'Cereals', 'Eggs', 'Fruits', 'Meat', 'Milk', 'Miscellaneous', 
'Offals', 'Oilcrops', 'Pulses', 'Seafood', 'Spices', 'StarchyRoots', 'Stimulants', 'SugarCrops', 'SugarSweeteners', 'Treenuts', 'VegetableOils', 'Vegetables', 'VegetalProducts']
    var heatmap_data = [];
    data.forEach(d => {
        var country_arr = [];
        var keys = Object.keys(d);
        keys.forEach((key, index) => {
            var country_obj = new Object();
            country_obj.Country = d.Country;
            if (protein_source.includes(key)) {
                country_obj.ProteinSource = key;
                country_obj.Value = d[key];
            } else {
                return;
            }
            country_arr.push(country_obj);
        })
        heatmap_data = heatmap_data.concat(country_arr);
    });  
    function setTestName(name) {
        heatmap_data.name = name;
        Object.freeze(heatmap_data);
    }

    const mouseOver = (d, event) => {
        setSelectedData(d);
        setSelectedCountry(d.Country);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    }
    const mouseOut = () => {
        setSelectedData(null)
        setSelectedCountry(null);
        setTooltipX(null);
        setTooltipY(null);
    }
    
    const onclick = (d) =>{
        var label1 = Number(d.Seafood).toFixed(2)
        var others = Number(100-label1).toFixed(2)
        var temp = [{label: 'Seafood', value: label1}, {label:"Others", value:others}];
        // var temp = [{label: 'Cereals', value: Number(d.Cereals).toFixed(2)}, {label:"Meat", value:Number(d.Meat).toFixed(2)}, {label:"Others", value: Number(100-(d.Cereals+d.Meat)).toFixed(2)}];
        setSelectedPieData(temp)
        setSelectedPieChart(d.Country);
    }
    
    return <div className="container-fluid">
        <Navbar className='justify-content-center navbar' expand="lg">
            <div style={{textAlign:'center'}}> 
                <h2 id="title">Where to Find the Protein?</h2>
                <p id="subtitle">Explore the Correlation Between Protein Intake Sources Structure and COVID-19 Case Fatality Rate/ Obesity Rate</p>
            </div> 
        </Navbar>
        
        <div className="row">
                <div className="col-sm-2">
                    <Dropdown style={{padding:10}} onSelect={handleContinentSelect}>
                        <Dropdown.Toggle variant="secondary" id="continent_dropdown">
                            Select A Continent
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Africa">Africa</Dropdown.Item>
                            <Dropdown.Item eventKey="Asia">Asia</Dropdown.Item>
                            <Dropdown.Item eventKey="Europe">Europe</Dropdown.Item>
                            <Dropdown.Item eventKey="North America">North America</Dropdown.Item>
                            <Dropdown.Item eventKey="Oceania">Oceania</Dropdown.Item>
                            <Dropdown.Item eventKey="South America">South America</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm-8">
                    <Dropdown style={{padding:10}} onSelect={handleSortSelect}>
                        <Dropdown.Toggle variant="secondary" id="sort_dropdown">
                            Sort by
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="None">---</Dropdown.Item>
                            <Dropdown.Item eventKey="Case-Fatality Rate">Case-Fatality Rate</Dropdown.Item>
                            <Dropdown.Item eventKey="Obesity Rate">Obesity Rate</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm" style={{padding:10}}>
                    <InstructionBox ></InstructionBox>
                </div>
        </div>
        
        <div className="row">
            <div className="col-lg-6">
                <svg id='barchart' width="100%" viewBox="0 0 600 500">
                    <SymmetricBarChart data={data} 
                        offsetY={margin.top} 
                        height={(innerHeight/2)} 
                        width={(innerWidth-margin.gap)/2} 
                        selectedCountry={selectedCountry} 
                        selectedContinent = {continent}
                        mouseOver={mouseOver} 
                        mouseOut={mouseOut}
                        onclick={onclick}
                        />
                </svg>
            </div>
            <div className="col-lg-6">
                <svg id='heatmap' width="100%" viewBox="0 0 520 500">
                    <HeatMap data={heatmap_data} 
                        offsetX = {margin.left}
                        offsetY = {margin.top}
                        height={(innerHeight/2+40)} 
                        width={(innerWidth-margin.gap)/2}
                        selectedCountry={selectedCountry} 
                        setSelectedCountry={setSelectedCountry}
                        mouseOver={mouseOver} 
                        mouseOut={mouseOut}/>

                </svg>
            </div>
            <Tooltip d={selectedData} left={tooltipX} top={tooltipY}/>
        </div>
        <div className="row">
            <div style={{textAlign:'center'}}> 
                    <p id="subsection">Did you know? </p>
                    <p id="subsection">It's time to eat more <b>seafood</b> to combat COVID-19!</p>
                    <p id="subsection">Sort the bars based on case fatality rate and click on countries with higher case fatality rate <br></br> and lower case fatality rate to find out why!</p>
                </div> 
        </div>
        <div className="row">
            <div className="col-lg-6">
                <svg id='piechart' width="100%" viewBox="0 0 520 500">
                    <PieChart data={selectedPieData} PiechartOn={selectedPieChart} outerRadius={150} innerRadius={0}></PieChart>
                </svg>
            </div>
            <div className="col-lg-6">
                <img width="100%" viewBox="0 0 520 500" src="https://user-images.githubusercontent.com/81611081/207016456-d3c29497-2f9b-4c06-9f59-04338df121c9.png" alt="React Image" />
            </div>
        </div>
    </div>
}

// margin: top. right. bottom. left
document.getElementById("root").style.padding="50px 30px 50px 30px"
// document.getElementById("root").style.backgroundColor='#FFF8EA'
ReactDOM.render(<Protein_Obesity_Covid/ >, document.getElementById("root"));