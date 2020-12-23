import moment from 'moment';

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
    while (baseDate < moment().subtract(1, 'day'))
    {
        if(counter % interval === 0)
        {
            if(year !== baseDate.year())
            {
                resultArray.push(baseDate.format('YYYY'));
                year = baseDate.year();
            }
            else
            {
                resultArray.push(baseDate.format(format));
            }
        }
        else
        {
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
            return 7;
        case 3: //1Y
            return 14;
        case 4: //All
            return 28;
    }
}