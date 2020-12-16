import moment from 'moment';

export function getAvatarColor(str)  {
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

export function getChartEndDate()
{
    return moment().format("YYYY-MM-DDT00:00:00");
}

export function getChartStartDate(periodIndex)
{
    let defaultStart = '2018-01-01';
    switch(periodIndex)
    {
        case 0: //1M
        return moment().subtract(1, 'month').format("YYYY-MM-DDT00:00:00");
        case 1: //3M
        return moment().subtract(3, 'month').format("YYYY-MM-DDT00:00:00");
        case 2: //6M
        return moment().subtract(6, 'month').format("YYYY-MM-DDT00:00:00");
        case 3: //1Y
        return moment().subtract(1, 'year').format("YYYY-MM-DDT00:00:00");
        case 4: //All
        return moment(defaultStart).format("YYYY-MM-DDT00:00:00");
    }
}

export function getChartValueFilter(periodIndex)
{
    switch(periodIndex)
    {
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