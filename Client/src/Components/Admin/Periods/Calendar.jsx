import { useState } from "react";

import { UilArrowLeft, UilArrowRight } from "@iconscout/react-unicons";

import { parse, format, startOfToday, isEqual, isSameMonth } from "date-fns";

import useCalendarHelpers from "../../Client/Reservation/Components/Hooks/useCalendarHelpers";

import { useSelector, useDispatch } from "react-redux";
import {
  disableEndingDate,
  disableStartingDate,
  setReadOnly,
} from "../../../Redux/Admin/periods";


const Calendar = ({setValue}) => {
  let { CalculateNewDays, nextMonth, previousMonth } = useCalendarHelpers();
  
  let Today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(null);
  let [currentMonth, setCurrentMonth] = useState(format(Today, "MMM yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM yyyy", new Date());
  let newDays = CalculateNewDays(firstDayCurrentMonth);

  let { readOnly,startingDate,endingDate } = useSelector((state) => state.periods);
  let dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          className={`${readOnly ? "hover:cursor-pointer" : ""}`}
          disabled={!readOnly}
          onClick={() => previousMonth(firstDayCurrentMonth, setCurrentMonth)}
        >
          <UilArrowLeft />
        </button>
        <span className="font-bold">
          {format(firstDayCurrentMonth, "MMM yyyy")}
        </span>
        <button
          className={`${readOnly ? "hover:cursor-pointer" : ""}`}
          disabled={!readOnly}
          onClick={() => nextMonth(firstDayCurrentMonth, setCurrentMonth)}
        >
          <UilArrowRight />
        </button>
      </div>
      <div className="w-full mb-3">
        <div className="flex flex-col gap-2 min-w-full">
          <div className="grid grid-cols-7 justify-items-center align-middle w-full border-2 rounded-xl">
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>
            <p>Sun</p>
          </div>
          <div className="grid grid-cols-7 justify-items-center align-middle w-full gap-y-3">
            {newDays.map((day) => (
              <button
                key={day.toString()}
                className={`
                            ${
                              isEqual(Today, day) &&
                              !isEqual(selectedDay, Today)
                                ? "text-pink-600"
                                : ""
                            }
                            ${
                              isEqual(Today, day) &&
                              isEqual(selectedDay, Today)
                                ? "text-pink-600 bg-indigo-400"
                                : ""
                            }
                            ${
                              readOnly &&
                              "hover:bg-indigo-400 hover:disabled:bg-transparent"    
                            }
                              h-8 w-8 rounded-full font-medium
                            ${
                              isSameMonth(day, firstDayCurrentMonth)
                                ? ""
                                : "text-gray-400"
                            }
                        `}
                onClick={() => {
                  if(startingDate.active)
                  {
                    setValue("startingDate", format(day,'dd-MM-yyyy'))
                    dispatch(disableStartingDate())
                  }
                  else if(endingDate.active)
                  {
                    setValue("endingDate", format(day,'dd-MM-yyyy'))
                    dispatch(disableEndingDate())
                  }
                  dispatch(setReadOnly(false));
                }}
                disabled={!isSameMonth(day, firstDayCurrentMonth) || !readOnly}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
