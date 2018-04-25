import React from 'react';
import {handlePercentage} from "../utils/InputHandling";
import {handleDollar} from "../utils/InputHandling";
import {handleInteger} from "../utils/InputHandling";


// ----------------------------
// PERCENTAGE VALUES
// ----------------------------

test('non-numeric characters are stripped from percentages', () => {
   const testString = "10a";
    const outcome = handlePercentage(testString);
    expect(outcome.decoratedValue).toEqual("10")
});

test('percentage inputs are only permitted to have one decimal', () => {
    const testString = "10.0.0";
    const outcome = handlePercentage(testString);
    expect(outcome.decoratedValue).toEqual("100.0")
});

test('percentage inputs cannot exceed the value ceiling, if one is defined', () => {
    const testString = "104";
    const outcome = handlePercentage(testString, 100);
    expect(outcome.decoratedValue).toEqual("100")
});

test('percentage inputs can exceed 100, if no value ceiling is defined', () => {
    const testString = "104";
    const outcome = handlePercentage(testString);
    expect(outcome.decoratedValue).toEqual("104")
});


// ----------------------------
// DOLLAR VALUES
// ----------------------------

test('dollar values include thousand separators (commas) when appropriate', () => {
    const testString = "10000";
    const outcome = handleDollar(testString);
    expect(outcome.decoratedValue).toEqual("10,000")
});

test('dollar values do not include decimal places', () => {
    const testString = "10.0";
    const outcome = handleDollar(testString);
    expect(outcome.decoratedValue).toEqual("100")
});

test('leading zeroes are stripped from dollar inputs', () => {
    const testString = "0100";
    const outcome = handleDollar(testString);
    expect(outcome.decoratedValue).toEqual("100")
});

// ----------------------------
// INTEGER VALUES (e.g. years)
// ----------------------------

test('generic integer values are not decorated with thousand separators (commas)', () => {
    const testString = "10000";
    const outcome = handleInteger(testString);
    expect(outcome.decoratedValue).toEqual("10000")
});