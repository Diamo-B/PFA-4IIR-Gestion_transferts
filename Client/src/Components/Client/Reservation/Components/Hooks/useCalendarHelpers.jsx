import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
} from "date-fns";

const useCalendarHelpers = () => {
    
    let CalculateNewDays = (firstDayCurrentMonth) => {
        return eachDayOfInterval({
          start: startOfWeek(startOfMonth(firstDayCurrentMonth),{ weekStartsOn: 1 }), 
          end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
        })
    };
    
    let nextMonth = (firstDayCurrentMonth,setCurrentMonth) => {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        setCurrentMonth(format(firstDayNextMonth,'MMM yyyy'));
    }

    let previousMonth = (firstDayCurrentMonth,setCurrentMonth) => {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, {months: -1});
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM yyyy'));
    }
      

    return {CalculateNewDays,nextMonth,previousMonth};
}
 
export default useCalendarHelpers;