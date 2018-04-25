import {addThousandsSeparator} from "./ReportDecoration";

function handleDollar(dollarInput) {

    // preliminary cleaning (non-numeric characters, leading zeroes)
    dollarInput = preliminaryClean(dollarInput);

    // capture the numeric representation of the dollarInput
    let numericValue = parseInt(dollarInput, 10);

    // add thousands separator
    dollarInput = addThousandsSeparator(dollarInput);

    // note: because we're speculating on long-term investment outcomes,
    // I have refrained from handling decimals (cents, in this context, are meaningless).

    return {
        decoratedValue: dollarInput,
        numericValue: numericValue
    }

}

function handlePercentage(percentageString, percentageCeiling) {

    // on percentageCeiling:
    // ------------------------
    // The acceptable range for a percentage value differs
    // depending on the context; for example:
    // > Marginal Tax Rate    - can't exceed 100% (barring some strange and kafka-esque dystopian shift)
    // > Return on Investment - no need to constrain

    // strip all non-numeric characters except decimals
    percentageString = percentageString.replace(/[^0-9.]/g,'');

    // remove the first decimal, if there are two or more.
    if ((percentageString.match(/\./g) || []).length > 1) {
        percentageString = percentageString.replace('.', ''); // replace the first instance
    }

    // convert string to float
    let floatPercentage = parseFloat(percentageString);

    // enforce the value ceiling - prevent user input from
    // exceeding a certain value, if requested by the caller.
    if (percentageCeiling && floatPercentage > 100) {
        floatPercentage = 100.0;
        percentageString = '100';
    }

    return {
        decoratedValue: percentageString,
        numericValue: floatPercentage
    }

}



function handleInteger(integerString) {

    // preliminary cleaning (non-numeric characters, leading zeroes)
    integerString = preliminaryClean(integerString);

    // capture the numeric representation of the userInput
    let numericValue = parseInt(integerString, 10);

    return {
        decoratedValue: integerString,
        numericValue: numericValue
    }

}

function preliminaryClean(userInput) {

    // strip all non-numeric characters
    userInput = userInput.replace(/\D/g,'');

    // strip leading zeroes from input
    userInput = userInput.replace(/^0+/, '');

    return userInput;

}

function isInputValid(numericInput) {

    let validityCheck = (numericInput != null && !isNaN(numericInput));

    return validityCheck;

}


// export previously declared functions
export { handleDollar };
export { handlePercentage };
export { handleInteger };
export { isInputValid };
