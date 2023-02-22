import { scaleLinear, scaleBand, scaleSequential } from "d3";

export const Scales = {
    linear: (min_value, max_value, start_pos, end_pos) => {
        return scaleLinear()
            .range([start_pos, end_pos])
            .domain([min_value, max_value])
            .nice();
        },
    band: (discreteValue, start_pos, end_pos) => {
        return scaleBand()
        .range([start_pos, end_pos])
        .domain(discreteValue);
    },
    colorpie: (domainArry, rangeArrage) => {
        return scaleLinear()
            .domain(domainArry)
            .range(rangeArrage)
    },
    colorSequential:(domainArry, colorScheme) => {
        return scaleSequential(colorScheme)
            .domain(domainArry);
    }
    }