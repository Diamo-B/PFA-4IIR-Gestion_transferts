import { useEffect, useState } from "react";
import useCalendarHelpers from "./Hooks/useCalendarHelpers";

import { UilArrowLeft, UilArrowRight } from "@iconscout/react-unicons";

import { parse, format, startOfToday, isEqual, isSameMonth} from "date-fns";

import { useSelector, useDispatch } from "react-redux";
import {setArrivalDate, setDepartureDate} from '../../../../Redux/Client/dates';

const Calendar = ({inputType}) => {

    let {CalculateNewDays,nextMonth,previousMonth} = useCalendarHelpers();

    useEffect(()=>{
        let ID = document.getElementById('topLevel');
        ID.classList.add("overflow-hidden");
    },[])
    
    let Today = startOfToday();
    
    let selectedDay;
    if(inputType == "Departure")
        selectedDay = useSelector(state => state.travelDates.itinerary.departureDate.value);
    else
        selectedDay = useSelector(state => state.travelDates.itinerary.arrivalDate.value);
    selectedDay = new Date(selectedDay);

    const dispatcher = useDispatch();
    let [currentMonth, setCurrentMonth] = useState(format(Today, 'MMM yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM yyyy', new Date());

    let newDays = CalculateNewDays(firstDayCurrentMonth);
    return ( 
        <>
            <p className=" text-xl font-bold capitalize mb-3">{inputType} Date</p>
            <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hover:cursor-pointer"
                    onClick={()=>previousMonth(firstDayCurrentMonth,setCurrentMonth)}
                >
                    <UilArrowLeft/>
                </span>
                <span className="font-bold">
                    {format(firstDayCurrentMonth, "MMM yyyy")}
                </span>
                <span className="hover:cursor-pointer"
                    onClick={()=>nextMonth(firstDayCurrentMonth,setCurrentMonth)}
                >
                    <UilArrowRight/>
                </span>
            </div>
            <div className="w-full mb-3">
                <div className="flex flex-col gap-2 min-w-full"> {/* Header */}
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
                        {
                            newDays.map((day)=>(
                                <button
                                    key={day.toString()}
                                    onClick={()=>{
                                        inputType == "Departure"? dispatcher(setDepartureDate(day.getTime())) : dispatcher(setArrivalDate(day.getTime()))
                                    }}
                                    className={`hover:bg-indigo-400 hover:disabled:bg-transparent h-8 w-8 rounded-full font-medium
                                        ${
                                            isEqual(Today,day) && !isEqual(selectedDay,Today)?
                                            'text-pink-600':''
                                        }
    
                                        ${
                                            isEqual(selectedDay,day)?
                                            'bg-indigo-400 text-white':''
                                        }

                                        ${
                                            isSameMonth(day,firstDayCurrentMonth)?
                                            '':'text-gray-400'
                                        }
                                    `}
                                    disabled={!isSameMonth(day,firstDayCurrentMonth)}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    );
}


export default Calendar;