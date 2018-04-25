import React from 'react';
import {calculateAfterTaxDepositValue, estimateIncomeByTaxRate, percentageToDecimal} from "../utils/Financial";
import {calculateFutureAccountValue} from "../utils/Financial";
import {calculateTaxPaidUponWithdrawal} from "../utils/Financial";
import {calculateAfterTaxFutureAccountValue} from "../utils/Financial";
import {calculateRealRateOfReturn} from "../utils/Financial";
import {isInputValid} from "../utils/InputHandling";
import {roundNumber} from "../utils/ReportDecoration";


// ------------------------------
// calculateAfterTaxDepositValue
// ------------------------------

test('Calculate the after-tax value of a deposit, when tax is required', () => {
    const depositValue = 1000;
    const outcome = calculateAfterTaxDepositValue(depositValue, 40, true);
    expect(outcome).toEqual(600);
});

test('Calculate the after-tax value of a deposit, when tax is NOT required', () => {
    const depositValue = 1000;
    const outcome = calculateAfterTaxDepositValue(depositValue, 40);
    expect(outcome).toEqual(1000);
});

// ------------------------------
// calculateFutureAccountValue
// ------------------------------
// test values sourced from:
// http://www.financeformulas.net/Real_Rate_of_Return.html

test('Calculate the future value of an account with only return rate specified', () => {
    const depositValue = 1000;
    const inflation = null;
    const yearsInvested = 1;
    const returnOnInvestment = 5;

    var outcome = calculateFutureAccountValue(depositValue, returnOnInvestment, inflation, yearsInvested);
    expect(outcome).toEqual(1050);
});

test('Calculate the future value of an account with only inflation rate specified', () => {
    const depositValue = 1000;
    const inflation = 5;
    const yearsInvested = 1;
    const returnOnInvestment = null;

    var outcome = calculateFutureAccountValue(depositValue, returnOnInvestment, inflation, yearsInvested);
    // outcome is returned as a float; we need to convert to an integer
    expect(parseInt(outcome, 10)).toEqual(952);
});

test('Calculate the future value of an account with inflation and return rate specified', () => {
    const depositValue = 1000;
    const inflation = 3;
    const yearsInvested = 1;
    const returnOnInvestment = 5;

    var outcome = calculateFutureAccountValue(depositValue, returnOnInvestment, inflation, yearsInvested);
    // outcome is returned as a float; we need to convert to an integer
    expect(parseInt(outcome, 10)).toEqual(1019);
});

// ------------------------------
// calculateTaxPaidUponWithdrawal
// ------------------------------

test('Calculate the tax paid on withdraw for an account subject to taxes', () => {
    const accountValue = 1000;
    const retirementTaxRate = 40;
    const withdrawTaxable = true;

    var outcome = calculateTaxPaidUponWithdrawal(accountValue, retirementTaxRate, withdrawTaxable);
    expect(outcome).toEqual(400);
});

test('Calculate the tax paid on withdraw for an account NOT subject to taxes', () => {
    const accountValue = 1000;
    const retirementTaxRate = 40;
    const withdrawTaxable = false;

    var outcome = calculateTaxPaidUponWithdrawal(accountValue, retirementTaxRate, withdrawTaxable);
    expect(outcome).toEqual(0);
});

// ------------------------------
// calculateAfterTaxFutureAccountValue
// ------------------------------

test('Calculate the value of an account minus tax deductions', () => {
    const accountValue = 1000;
    const taxDeduction = 600;

    var outcome = calculateAfterTaxFutureAccountValue(accountValue, taxDeduction);
    expect(outcome).toEqual(400);
});

// ------------------------------
// calculateRealRateOfReturn
// ------------------------------

test('Calculate the Real Rate of Return', () => {
    const nominalRate = 5;
    const inflationRate = 3;

    var outcome = calculateRealRateOfReturn(nominalRate, inflationRate);
    outcome = roundNumber((100 * outcome), 3);

    expect(outcome).toEqual(1.942);
});

// ------------------------------
// percentageToDecimal
// ------------------------------

test('Convert Percentages to Decimals', () => {
    const percentage = 10;

    var outcome = percentageToDecimal(percentage);

    expect(outcome).toEqual(0.10);
});

// ------------------------------
// estimateIncomeByTaxRate
// ------------------------------

test('Estimate Tax Bracket by Tax Rate', () => {
    const taxRate = 42.5;

    var outcome = estimateIncomeByTaxRate(taxRate);

    expect(outcome).toEqual("$110,631 - $144,489");
});
