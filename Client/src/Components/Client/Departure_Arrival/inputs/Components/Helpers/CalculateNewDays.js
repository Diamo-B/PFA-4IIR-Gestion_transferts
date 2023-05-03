import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

let CalculateNewDays = (firstDayCurrentMonth) => {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth),{ weekStartsOn: 1 }), 
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })
};

export default CalculateNewDays;