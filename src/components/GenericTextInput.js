import {isInputValid} from '../utils/InputHandling';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericTextInput extends Component {

    constructor() {
        super();

        this.prependAddon = this.prependAddon.bind(this);
        this.appendAddon  = this.appendAddon.bind(this);

    }

    handleInputChange = (event) => {

        // determine the string and numeric representation of the user's input
        const valueCollection = this.props.handleInput(event.target.value, this.props.valueCeiling);

        // return the numeric value to the parent component
        this.props.handleInputChange(event, valueCollection.decoratedValue, valueCollection.numericValue);

    };

    prependAddon() {
        if (this.props.inputAddonPrependChar) {

            return <div className="input-group-prepend">
                <span className="input-group-text">{this.props.inputAddonPrependChar}</span>
            </div>

        }
    }

    appendAddon() {
        if (this.props.inputAddonAppendChar) {

            return <div className="input-group-append">
                <span className="input-group-text">{this.props.inputAddonAppendChar}</span>
            </div>

        }
    }

    inputStatusClass() {
        if (isInputValid(this.props.numericValue)) {
            return "input-validated";
        } else {
            return "input-incomplete";
        }
    }

    render() {
        return <div className="input-group">

            {this.prependAddon()}

            <input name={this.props.name} className={"form-control " + this.inputStatusClass()}
                   type="text"
                   value={this.props.stringValue}
                   onChange={this.handleInputChange.bind(this)} />

            {this.appendAddon()}

        </div>

    }
}

GenericTextInput.propTypes = {
    name: PropTypes.string,
    inputAddonPrependChar: PropTypes.string,
    inputAddonAppendChar: PropTypes.string,
    handleInput: PropTypes.func,
    valueCeiling: PropTypes.number,
};

export default GenericTextInput;
