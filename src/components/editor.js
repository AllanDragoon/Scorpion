import React, {Component} from 'react';
import * as d3 from 'd3';
import Grid from './grid';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.zoomed = this.zoomed.bind(this);
    }

    componentDidMount() {
        var bindZoom = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", this.zoomed);
        var svgNode = this.refs.svg;
        d3.select(svgNode).call(bindZoom);
    }

    zoomed() {
        var containerNode = this.refs.container;
        var transform = d3.event.transform;
        d3.select(containerNode).
            attr("transform", 
                "translate(" + transform.x + "," + transform.y + ")scale(" + transform.k + ")");
    }

    render() {
        return (
            <svg width='100%' height='100%' ref='svg'>
                <g ref='container'>
                    <Grid />
                </g>
            </svg>
        );
    }
}

export default Editor;