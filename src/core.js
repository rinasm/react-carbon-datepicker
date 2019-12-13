const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDayDetails =args=> {
    let date = args.index - args.firstDay; 
    let day = args.index%7;
    let prevMonth = args.month-1;
    let prevYear = args.year;
    if(prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
    let valid = (date >= 0 && date < args.numberOfDays) ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
        date: _date,
        day,
        valid, 
        timestamp,
        dayString: daysMap[day],
        reminder: args.reminders[timestamp] || null
    }
}

export const getMonthDetails =(year, month, reminders)=> {
    let firstDay = (new Date(year, month)).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let currentDay = null;
    let index = 0;
    let reminderMap = {};

    for(let idx in reminders) {
        let tempDate = new Date(reminders[idx].timestamp);
        let startOfTheDay = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime()
        reminderMap[startOfTheDay] = reminders[idx];
    }

    for(let row=0; row<6; row++) {
        for(let col=0; col<7; col++) { 
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month,
                reminders: reminderMap
            });
            monthArray.push(currentDay);
            index++;
        }
    }
    return monthArray;
}

export const getNumberOfDays =(year, month)=> {
    return 32 - new Date(year, month, 32).getDate();
}

export const validateDate =(year, month, date, hour, minute)=> {
    let jsDate = new Date();
    let defaultAsCurrent = true;
    year = parseInt(!year ? jsDate.getFullYear() : (year > 0 === false || year < 1970) ? 1970 : year, 10);
    month = parseInt(Math.max(1, Math.min(12, !month ? defaultAsCurrent ? jsDate.getMonth() + 1 : 1 : month > 0 === false ? 1 : month)), 10);
    let maxDays = getNumberOfDays(year, month-1);
    date = parseInt(Math.max(1, Math.min(maxDays, !date ? defaultAsCurrent ? jsDate.getDate() : 1 : date > 0 === false ? 1 : date)), 10);
    hour = parseInt(Math.max(0, Math.min(23, !hour ? defaultAsCurrent ? jsDate.getHours() : 0 : hour > 0 === false ? 0 : hour)), 10);
    minute = parseInt(Math.max(0, Math.min(59, !minute ? defaultAsCurrent ? jsDate.getMinutes() : 0 : minute > 0 === false ? 0 : minute)), 10);
    return {year, month, date, hour, minute, yearTemp: year};
}