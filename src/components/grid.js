import React, { Component } from 'react';
import * as d3 from 'd3';

class Grid extends Component {
    componentDidUpdate() {
        this.renderGrid();
    }

    componentDidMount() {
        this.renderGrid();
    }

    renderGrid() {
        var xAxisNode = this.refs.xAxis;
        d3.select(xAxisNode)
            .selectAll('line')
            .data(d3.range(-500, 1001, 10))
            .enter()
                .append('line')
                .attr('x1', -500)
                .attr('y1', d => d)
                .attr('x2', 1000)
                .attr('y2', d => d);
        
        var yAxisNode = this.refs.yAxis;
        d3.select(yAxisNode)
            .selectAll('line')
            .data(d3.range(-500, 1001, 10))
            .enter()
                .append('line')
                .attr('x1', d => d)
                .attr('y1', -500)
                .attr('x2', d => d)
                .attr('y2', 1000);
    }

    render() {
        return (
            <g>
              <g className="x axis" ref="xAxis"></g>
              <g className="y axis" ref="yAxis"></g>  
            </g>
        );
    }
}

export default Grid;