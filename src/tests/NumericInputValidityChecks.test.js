import React from 'react';
import {isInputValid} from "../utils/InputHandling";



test('null is not considered a valid input', () => {
    const testInput = null;
    var outcome = isInputValid(testInput);
    expect(outcome).toEqual(false);
});


test('undefined is not considered a valid input', () => {
    const testInput = undefined;
    var outcome = isInputValid(testInput);
    expect(outcome).toEqual(false);
});


test('0 is considered a valid input', () => {
    // percentages can be expressed as 0;
    const testInput = 0;
    var outcome = isInputValid(testInput);
    expect(outcome).toEqual(true);
});

