function decorateDollarValue(value, notApplicable) {

    // eslint-disable-next-line
    if (value != null && !isNaN(value) && value != 0) {

        // note the presence of != ... this is intentional
        // and was deliberately chosen instead of !==
        // to avoid type checks (depending on the context,
        // dollars can be represented as either float or int,
        // so we are only checking for value)
        value = "$" + roundNumber(value, 0);
        value = addThousandsSeparator(value);
    } else if (notApplicable) {
        // notApplicable allows the caller to specify
        // whether a given field should be rendered at all
        value = "N/A";
    } else {
        value = "$--";
    }

    return value;

}

function roundNumber(numberToRound, numberOfDecimalPlaces) {
    if (numberToRound === 0) {
        return 0;
    }

    if (!numberToRound) {
        return '';
    }

    const scrubbedNumber = numberToRound.toString().replace('$', '').replace(',', '');

    return Math.round(scrubbedNumber * Math.pow(10, numberOfDecimalPlaces)) / Math.pow(10, numberOfDecimalPlaces);

}

function addThousandsSeparator(value) {
    // add thousands separator
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(value)) {
        value = value.replace(rgx, '$1,$2');
    }

    return value;

}

export { decorateDollarValue };
export { addThousandsSeparator };
export { roundNumber };