import moment from 'moment';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';

const defaultStart = '2018-01-01';

export function getAvatarColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function getChartEndDate() {
    return moment().format("YYYY-MM-DDT00:00:00");
}

export function getIndexRange() {
    return [0, 1, 2, 3, 4];
}

export function getDateFilterButtonLabels() {
    return ['1M', '3M', '6M', '1Y', 'All'];
}

export function getComparisonButtonLabels() {
    return ['Ratio', 'Yields', 'P&L', 'Volatility', 'VAR'];
}

export function getComparisonButtonLabelForIndex(index) {
    switch (index) {
        case 0:
            return 'SharpeRatio';
        case 1:
            return 'Yield';
        case 2:
            return 'PNL';
        case 3:
            return 'Volatility';
        case 4:
            return 'VAR';
    }
}

export function formatComparisonValue(unit, value, currencyFormat) {
    switch (unit) {
        case 'ccy':
            return `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${value.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
        case 'percent':
            return `${value}%`;
        default:
            return value.toFixed(2);
    }
}

export function getChartStartDate(periodIndex) {

    switch (periodIndex) {
        case 0: //1M
            return moment().subtract(30, 'day').format("YYYY-MM-DDT00:00:00");
        case 1: //3M
            return moment().subtract(90, 'day').format("YYYY-MM-DDT00:00:00");
        case 2: //6M
            return moment().subtract(180, 'day').format("YYYY-MM-DDT00:00:00");
        case 3: //1Y
            return moment().subtract(365, 'day').format("YYYY-MM-DDT00:00:00");
        case 4: //All
            return moment(defaultStart).format("YYYY-MM-DDT00:00:00");
    }
}

export function getChartKeys(periodIndex) {

    switch (periodIndex) {
        case 0: //1M
            return '_1m';
        case 1: //3M
            return '_3m';
        case 2: //6M
            return '_6m';
        case 3: //1Y
            return '_1y';
        case 4: //All
            return '_all';
    }
}

export function getChartAxisLabels(periodIndex, arraylength) {
    let baseDate = moment();
    let interval = 0;
    let counter = 0;
    let format = 'DD';
    switch (periodIndex) {
        case 0: //1M
            interval = 5;
            counter = 2;
            format = 'DD';
            break;
        case 1: //3M
            interval = 15;
            counter = 6;
            format = 'DD MMM';
            break;
        case 2: //6M
            interval = 30;
            counter = 5;
            format = 'MMM';
            break;
        case 3: //1Y
            interval = 60;
            format = 'MMM';
            break;
        case 4: //All
            interval = 120;
            format = 'MMM';
            break;
    }
    baseDate = moment().subtract(arraylength, 'day');

    let year = baseDate.year();
    const resultArray = [];
    while (baseDate < moment().subtract(1, 'day')) {
        if (counter % interval === 0) {
            if (year !== baseDate.year()) {
                resultArray.push(baseDate.format('YYYY'));
                year = baseDate.year();
            }
            else {
                resultArray.push(baseDate.format(format));
            }
        }
        else {
            resultArray.push('');
        }
        baseDate.add(1, 'day');
        counter++;
    }

    return resultArray;
}

export function getChartValueFilter(periodIndex) {
    switch (periodIndex) {
        case 0: //1D
            return 1;
        case 1: //1W
            return 1;
        case 2: //6M
            return 9;
        case 3: //1Y
            return 9;
        case 4: //All
            return 18;
    }
}