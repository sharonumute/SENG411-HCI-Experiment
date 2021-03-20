import React from 'react';
import * as d3 from 'd3';

export const Format = Object.freeze({ TEXT: 'Text', BUBBLE: 'Bubble' });

export class Block extends React.Component {
    constructor(props) {
        super(props);
        this.blockRef = React.createRef();
    }

    componentDidMount() {
        this.RenderBlock();
    }
    componentDidUpdate() {
        this.RenderBlock();
    }

    RenderBlock = () => {
        d3.selectAll('svg > *').remove();
        const svg = d3.select(this.blockRef.current);

        const {
            format,
            n,
            startTime,
            curentIteration,
            advanceIteration,
        } = this.props;

        // the canvas size
        var width = 400;
        var height = 400;

        const NB_VALUES = n;

        var values = d3
            .range(NB_VALUES)
            .map((d) => Math.floor(Math.random() * 100)); // the randomly generated set of values between 0 and 99

        console.log(values);

        var pad = 5; //padding for grid layout (text and bubble)
        var numCol, numRow; // number of columns, number of rows
        var font_size;

        if (NB_VALUES === 25) {
            numCol = 5;
            numRow = 5;
            font_size = 48; // arbitrary choice
        } else if (NB_VALUES === 3 || NB_VALUES === 5 || NB_VALUES === 9) {
            numCol = 3;
            numRow = 3;
            font_size = 48; // arbitrary choice
        } else {
            return null;
        }

        const _w = width / numCol;
        const _h = height / numRow;
        const scales = {};
        scales.x = d3.scalePoint().range([0, _w]).padding(0.5).align(1);
        scales.y = d3.scaleBand().range([0, _h]).paddingInner(0.3);

        var maxCircleRadius =
            d3.min([scales.y.bandwidth(), scales.x.step()]) / 2;

        var sign = svg
            .selectAll('g') // create one group element to display each value, puts it at its position
            .data(values)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
                return (
                    'translate(' +
                    ((i % numCol) * _w + (pad / 2) * -1) +
                    ',' +
                    (Math.floor(i / numRow) * _h + (pad / 2) * -1) +
                    ')'
                );
            })
            .on('click', (d) => {
                const endTime = Date.now();
                const reactTime = Math.floor((endTime - startTime) / 1000);

                const selectedAnswer = d.srcElement.__data__;
                var correctAnswer, maxVal;
                correctAnswer = maxVal = d3.max(values);
                const minVal = d3.min(values);

                const error = Math.abs(
                    (correctAnswer - selectedAnswer) / (maxVal - minVal)
                );

                console.log('Number of values: ', n);
                console.log('Format: ', format);
                console.log('Iteration: ', curentIteration);
                console.log('React time: ', reactTime);
                console.log('Answer picked: ', selectedAnswer);
                console.log('Correct answer: ', correctAnswer);
                console.log('Error: ', error);

                advanceIteration();
            })
            .style('cursor', 'pointer'); //make it a pointer on mouseover

        if (format === Format.BUBBLE) {
            //that's to create a perceptual scaling by mapping square root of value to radius, but other scaling functions could be used

            var circleRadiusScale = d3
                .scaleLinear()
                .domain([Math.sqrt(d3.min(values)), Math.sqrt(d3.max(values))])
                .range([5, maxCircleRadius]);

            //create an 'invisible' circle of size half the max size of a bubble, simply to make it possible to click the smaller circles easily.
            sign.append('circle')
                .attr('cx', _w / 2)
                .attr('cy', _w / 2)
                .attr('r', maxCircleRadius / 2)
                .style('fill', 'white');

            // then, for each cell we appends a circle
            sign.append('circle')
                .attr('cx', _w / 2)
                .attr('cy', _w / 2)
                .attr('r', (d) => circleRadiusScale(Math.sqrt(d)))
                .style('fill', 'black');
        } else if (format === Format.TEXT) {
            //create an 'invisible' circle of size half the max size of a bubble, simply to make it possible to click the smaller circles easily.
            sign.append('circle')
                .attr('cx', _w / 2)
                .attr('cy', _w / 2)
                .attr('r', maxCircleRadius / 2)
                .style('fill', 'white');

            sign.append('text')
                .attr('x', _w / 2)
                .attr('y', _w / 2)
                .attr('text-anchor', 'middle')
                .attr('font-size', font_size + 'px')
                .text((d) => d);
        }
    };

    render() {
        return (
            <svg ref={this.blockRef} style={{ height: 400, width: 400 }}></svg>
        );
    }
}
