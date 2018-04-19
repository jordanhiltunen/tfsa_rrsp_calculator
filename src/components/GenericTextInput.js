import {isInputValid} from '../utils/InputHandling';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericTextInput extends Component {

    constructor() {
        super();
        this.state = {
            rawValue: '',
            decoratedValue: '',
            numericValue: '0',
            validated: false };

        this.prependAddon = this.prependAddon.bind(this);
        this.appendAddon  = this.appendAddon.bind(this);

    }

    handleInputChange = (event) => {

        // GenericTextInput aims to do two things with user input:
        // 1.) constrain input (forced validation) and represent values in an intuitive way
        // 2.) maintain a separate numeric representation of user input for the generation of the report
        // ...accordingly, whenever the input changes, we update both a decoratedValue, and a numericValue.

        var valueCollection  = this.props.handleInput(event.target.value, this.props.valueCeiling);

        var decoratedValue   = valueCollection.decoratedValue;
        var numericValue     = valueCollection.numericValue;


        this.setState(
            {
                rawValue: event.target.value,
                decoratedValue: decoratedValue,
                numericValue: numericValue,
                validated: isInputValid(numericValue)
            });

        // return the numeric value to the parent component
        this.props.onChange(event, numericValue);

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
        if (this.state.validated) {
            return "input-validated";
        } else {
            return "input-incomplete";
        }
    }

    render() {
        return <div className="input-group">

            {this.prependAddon()}

            <input name={this.props.name} className={"form-control " + this.inputStatusClass()}
                   type="text" value={this.state.decoratedValue} onChange={this.handleInputChange} />

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
