import React, {Component} from 'react';
import * as d3 from 'd3';

class Editor extends Component {
    constructor(props) {
        super(props);

        // 必须bind，否则在zoomed执行的时候this会是svg
        this.zoomed = this.zoomed.bind(this);
    }

    componentDidMount() {
        this.updateInternal();
    }

    componentDidUpdate() {
        this.updateInternal();
    }

    updateInternal() {
        var pixelsPerMeter = 20;
        var extents = this.calculateExtents(pixelsPerMeter);

        // Bind zoom
        var bindZoom = d3.zoom()
            .scaleExtent([1, 10])
            .translateExtent([
                [extents.widthStart, extents.heightStart], 
                [extents.widthEnd, extents.heightEnd]])
            .on("zoom", this.zoomed);
        var svgNode = this.refs.svg;
        d3.select(svgNode).call(bindZoom);

        // Draw grid
        this.renderGrid(extents, pixelsPerMeter);
    }

    zoomed() {
        var containerNode = this.refs.container;
        var transform = d3.event.transform;
        d3.select(containerNode).
            attr("transform", 
                "translate(" + transform.x + "," + transform.y + ")scale(" + transform.k + ")");
    }

    calculateExtents(pixelsPerMeter) {
        // 获取svg的宽和高
        // http://stackoverflow.com/questions/21990857/d3-js-how-to-get-the-computed-width-and-height-for-an-arbitrary-element
        var rect = this.refs.svg.getBoundingClientRect();
        var svgWidth = rect.width;
        var svgHeight = rect.height;
        // 中心
        var centerX = parseInt(svgWidth / 2);
        var centerY = parseInt(svgHeight / 2);

        // 在svg大小的基础上各边分别外扩50米
        const extend = 50 * pixelsPerMeter;

        // 计算网格起至
        var widthStart = centerX - parseInt(centerX / pixelsPerMeter) * pixelsPerMeter -extend;
        var widthEnd = centerX + parseInt((svgWidth - centerX) / pixelsPerMeter) * pixelsPerMeter + extend; 
        var heightStart = centerY - parseInt(centerY / pixelsPerMeter) * pixelsPerMeter -extend;
        var heightEnd = centerY + parseInt((svgHeight - centerY) / pixelsPerMeter) * pixelsPerMeter + extend;

        return {
            widthStart,
            widthEnd,
            heightStart,
            heightEnd,
            centerX,
            centerY
        };
    }

    renderGrid(extents, unit) {
        // 产生一个range
        var widthRange = d3.range(extents.widthStart, extents.widthEnd, unit);
        var heightRange = d3.range(extents.heightStart, extents.heightEnd, unit);

        // 画横线        
        var xlinesNode = this.refs.xlines;
        var xlines = d3.select(xlinesNode)
            .selectAll('line')
            .data(heightRange);
        xlines.enter()
            .append('line')
            .attr('x1', extents.widthStart)
            .attr('y1', d => d)
            .attr('x2', extents.widthEnd)
            .attr('y2', d => d);
        xlines.exit().remove();

        // 画竖线
        var ylinesNode = this.refs.ylines;
        var ylines = d3.select(ylinesNode)
            .selectAll('line')
            .data(widthRange);
        ylines.enter()
            .append('line')
            .attr('x1', d => d)
            .attr('y1', extents.heightStart)
            .attr('x2', d => d)
            .attr('y2', extents.heightEnd);
        ylines.exit().remove();

        // 画中心点
        var center = d3.select(this.refs.center)
            .selectAll('circle')
            .data([{ centerX: extents.centerX, centerY: extents.centerY }]);
        center.enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', d => d.centerX)
            .attr('cy', d => d.centerY);
        center.exit().remove();
    }

    render() {
        return (
            <svg width={this.props.width ? this.props.width + 'px' : '100%'}
                height={this.props.height ? this.props.height + 'px': '100%'}
                ref='svg'>
                <g ref='container'>
                    <g className="x axis" ref="xlines"></g>
                    <g className="y axis" ref="ylines"></g>
                    <g className="center" ref="center"></g>
                </g>
            </svg>
        );
    }
}

export default Editor;