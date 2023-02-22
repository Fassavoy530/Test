import React, { useEffect } from 'react';
import * as d3 from 'd3';


function PieChart(props) {
    const {data, PiechartOn, outerRadius, innerRadius} = props;
    if (PiechartOn === null) {
        return <div></div>;
    } else {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;
    useEffect(() => {drawChart()}, [data]);
    
    function drawChart() {
        const colorScale = ['#53bcdb', '#e1f2f7']
        // Remove the old svg
            d3.select('#pie-container')
            .select('svg')
            .remove();
        // Create new svg
        const svg = d3
            .select('#pie-container')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2 + 50}, ${height / 2})`);

        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.value);
        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter();
        // Append sectors
        arc.append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => {
                return colorScale[i]})
            .style('stroke', '#ffffff')
            .style('stroke-width', 1);
        // Append text labels
        arc.append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.label)
            .style('fill', '#3b3b38')
            .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y})`;
            });
        arc.append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.value + "%")
            .style('fill', '#3b3b38')
            .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y+20})`;
            });
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text('Country: '+ PiechartOn)
            .style('fill', '#3b3b38')
            .attr('transform',`translate(${0}, ${-outerRadius-30})`);
    }    
    
    return <svg id="pie-container" />;
    
}}

export {PieChart}