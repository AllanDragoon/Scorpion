import React, {Component} from 'react';
import * as d3 from 'd3';

class Editor extends Component {
    constructor(props) {
        super(props);

        // 必须bind，否则在zoomed执行的时候this会是svg
        this.zoomed = this.zoomed.bind(this);

        // SVG的iewportInfo，用来作坐标转换
        this._viewpoortInfo = {
            left: undefined,
            top: undefined,
            right: undefined,
            bottom: undefined,
            originX: undefined,
            originY: undefined,
            pixelsPerMeter: 20
        };

        this._edges = [
            // {
            //     start: {x: 0, y: 0}, 
            //     end: {x: 4, y:0}
            // },
            // {
            //     ...
            // }
        ];
    }

    componentDidMount() {
        this.renderInternal();
    }

    renderInternal() {
        var pixelsPerMeter = 20;
        this._viewpoortInfo = this.calculateViewportInfo(pixelsPerMeter);
        var { left, right, top, bottom } = this._viewpoortInfo;

        // Bind zoom
        var bindZoom = d3.zoom()
            .scaleExtent([1, 10])
            .translateExtent([
                [left, top], 
                [right, bottom]])
            .on("zoom", this.zoomed);
        var svgNode = this.refs.svg;
        d3.select(svgNode).call(bindZoom);

        // Draw grid
        this.renderGrid();

        this.renderEdges();
    }

    zoomed() {
        var containerNode = this.refs.container;
        var transform = d3.event.transform;
        d3.select(containerNode).
            attr("transform", 
                "translate(" + transform.x + "," + transform.y + ")scale(" + transform.k + ")");
    }

    calculateViewportInfo(pixelsPerMeter) {
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
        var left = centerX - parseInt(centerX / pixelsPerMeter) * pixelsPerMeter -extend;
        var right = centerX + parseInt((svgWidth - centerX) / pixelsPerMeter) * pixelsPerMeter + extend; 
        var top = centerY - parseInt(centerY / pixelsPerMeter) * pixelsPerMeter -extend;
        var bottom = centerY + parseInt((svgHeight - centerY) / pixelsPerMeter) * pixelsPerMeter + extend;

        return {
            left,
            right,
            top,
            bottom,
            centerX,
            centerY,
            pixelsPerMeter
        };
    }

    newEdge(direction, distance) {
        var edges = this._edges;

        var last = { x: 0, y: 0};
        if (edges.length > 0) {
            last = edges[edges.length - 1].end;
        }

        var start = Object.assign({}, last);
        var end = Object.assign({}, start);
        switch (direction) {
            case 'up':
                end.y += distance;
                break;
            case 'down':
                end.y -= distance;
                break;
            case 'left':
                end.x -= distance;
                break;
            case 'right':
                end.x += distance;
                break;
        }

        edges.push({start, end});
        this.renderEdges();
    }

    renderGrid() {
        var {left, right, top, bottom, centerX, centerY, pixelsPerMeter} = this._viewpoortInfo;
        
        // 产生一个range
        var widthRange = d3.range(left, right, pixelsPerMeter);
        var heightRange = d3.range(top, bottom, pixelsPerMeter);

        // 画横线        
        var xlinesNode = this.refs.xlines;
        var xlines = d3.select(xlinesNode)
            .selectAll('line')
            .data(heightRange);
        xlines.enter()
            .append('line')
            .attr('x1', left)
            .attr('y1', d => d)
            .attr('x2', right)
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
            .attr('y1', top)
            .attr('x2', d => d)
            .attr('y2', bottom);
        ylines.exit().remove();

        // 画中心点
        var center = d3.select(this.refs.center)
            .selectAll('circle')
            .data([{ centerX: centerX, centerY: centerY }]);
        center.enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', d => d.centerX)
            .attr('cy', d => d.centerY);
        center.exit().remove();
    }

    renderEdges() {
        var self = this;
        var edge = d3.select(this.refs.edges)
            .selectAll('.wall')
            .data(this._edges);

        // Update
        edge.selectAll('line')
            .attr('x1', d => self.getPixelX(d.start.x))
            .attr('y1', d => self.getPixelY(d.start.y))
            .attr('x2', d => self.getPixelX(d.end.x))
            .attr('y2', d => self.getPixelY(d.end.y));
        
        edge.selectAll('.startPt')
            .attr('cx', d => self.getPixelX(d.start.x))
            .attr('cy', d => self.getPixelY(d.start.y));

        edge.selectAll('.endPt')
            .attr('cx', d => self.getPixelX(d.end.x))
            .attr('cy', d => self.getPixelY(d.end.y));

        // Enter
        var g = edge.enter()
            .append('g')
            .attr('class', 'wall');
        g.append('line')
            .attr('x1', d => self.getPixelX(d.start.x))
            .attr('y1', d => self.getPixelY(d.start.y))
            .attr('x2', d => self.getPixelX(d.end.x))
            .attr('y2', d => self.getPixelY(d.end.y));
        g.append('circle')
            .attr('class', 'startPt')
            .attr('r', 3)
            .attr('cx', d => self.getPixelX(d.start.x))
            .attr('cy', d => self.getPixelY(d.start.y));
        g.append('circle')
            .attr('class', 'endPt')
            .attr('r', 3)
            .attr('cx', d => self.getPixelX(d.end.x))
            .attr('cy', d => self.getPixelY(d.end.y));

        // Exit
        edge.exit().remove();
    }

    getPixelX(x) {
        var {centerX, pixelsPerMeter} = this._viewpoortInfo;
        return x * pixelsPerMeter + centerX;
    }

    getPixelY(y) {
        var {centerY, pixelsPerMeter} = this._viewpoortInfo; 
        return -y * pixelsPerMeter + centerY;
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
                    <g ref="edges"></g>
                </g>
            </svg>
        );
    }
}

export default Editor;