import React, { Component } from 'react';

export default class Slider extends Component {

    render() {
        return (
        <div>
            <div className="slidecontainer">
                <input type="range" min="0" max="1000" value={this.props.value} className="slider" id={this.props.id} onInput={e => this.props.sliderChange(e)} />
                <span>Value: <span id={this.props.spanID}>{this.props.value}</span></span>
            </div>
        </div>
        );
    }
}
