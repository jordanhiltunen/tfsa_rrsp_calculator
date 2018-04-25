import {Line} from 'rc-progress';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {

    constructor(props) {
        super(props);

        this.calculateProgressPercentage = this.calculateProgressPercentage.bind(this);
        this.calculateProgressColor      = this.calculateProgressColor.bind(this);

    }

    calculateProgressPercentage() {

        const progressCount = this.props.progressCount || 0;
        const progressPercentage = (progressCount / this.props.inputCount) * 100;

        return progressPercentage;

    }

    calculateProgressColor() {

        // color steps: beginning.....completed
        const colors = ["#E7F8F5", "#D0F1EC", "#B9EAE2", "#A2E3D9", "#8BDCD0", "#73D5C6", "#5CCEBD", "#45C7B4", "#2EC0AA"];
        // while our calculator only has six inputs, there are extra colors in the array to allow for
        // the addition of extra input fields without breaking the progress bar.

        const progressCount = this.props.progressCount || 0;
        const colorPosition = ((colors.length - 1) - (this.props.inputCount - progressCount));

        return colors[colorPosition];

    }

    render () {
        return (
            <div>
                <Line percent={this.calculateProgressPercentage()}
                      strokeColor={this.calculateProgressColor()}/>
            </div>
        )
    }
}


ProgressBar.propTypes = {
    inputCount: PropTypes.number,
    progressCount: PropTypes.number
};

export default ProgressBar;
