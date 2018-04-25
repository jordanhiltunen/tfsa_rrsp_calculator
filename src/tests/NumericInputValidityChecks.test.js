import React from 'react';
import {isInputValid} from "../utils/InputHandling";



test('null is not considered a valid input', () => {
    const testInput = null;
    const outcome = isInputValid(testInput);
    expect(outcome).toEqual(false);
});


test('undefined is not considered a valid input', () => {
    const testInput = undefined;
    const outcome = isInputValid(testInput);
    expect(outcome).toEqual(false);
});


test('0 is considered a valid input', () => {
    // percentages can be expressed as 0;
    const testInput = 0;
    const outcome = isInputValid(testInput);
    expect(outcome).toEqual(true);
});

