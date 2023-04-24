import {add,format} from 'date-fns'

let nextMonth = (firstDayCurrentMonth,setCurrentMonth) => {
  let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
  setCurrentMonth(format(firstDayNextMonth,'MMM yyyy'));
}

export default nextMonth;
