import moment from 'moment';

export const isDateSame = (date1: string, date2: string, format: string): boolean => {
    return moment(date1, format).isSame(moment(date2, format))
};

export const getDayName = (date: string) => {
    return moment(date).format('dddd');
}

export const formatDayName = (date1: string, date2: string) => {
    if(isDateSame(date1, date2, 'YYYY-MM-DD')) {
        return 'Today';
    } else return getDayName(date1).slice(0, 3);
}