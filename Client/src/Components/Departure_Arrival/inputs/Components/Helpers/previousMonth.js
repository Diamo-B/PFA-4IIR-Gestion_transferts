import {add,format} from 'date-fns'

let previousMonth = (firstDayCurrentMonth,setCurrentMonth) => {
  let firstDayPreviousMonth = add(firstDayCurrentMonth, {months: -1});
  setCurrentMonth(format(firstDayPreviousMonth, 'MMM yyyy'));
}

export default previousMonth;