import { UilAngleDoubleUp, UilAngleDoubleDown } from "@iconscout/react-unicons";
import { parse, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartureHour,
  subDepartureHour,
  addDepartureMinute,
  subDepartureMinute,
  addArrivalHour,
  subArrivalHour,
  addArrivalMinute,
  subArrivalMinute,
} from "../../../../Redux/Client/dates";
import { useState } from "react";

const Clock = ({inputType}) => {
  const dispatcher = useDispatch();
  const unixDate = useSelector((state) => 
    inputType == "Departure"?
      state.travelDates.itinerary.departureDate.value
    :
      state.travelDates.itinerary.arrivalDate.value
  );
  const dateObj = new Date(unixDate);

  const [holdInterval, setHoldInterval] = useState(null);

  const handleMouseDown = (op,interval) => {
    setHoldInterval(setInterval(() => {
      switch(op)
      {
        case "addH":
          dispatcher(inputType == "Departure"?addDepartureHour():addArrivalHour())
          break;
        case "subH":
          dispatcher(inputType == "Departure"?subDepartureHour():subArrivalHour())
          break;
        case "addM":
          dispatcher(inputType == "Departure"?addDepartureMinute():addArrivalMinute())
          break;
        case "subM":
          dispatcher(inputType == "Departure"?subDepartureMinute():subArrivalMinute())
          break;
      }
    }, interval)); // Set the interval to 1 second (1000 milliseconds)
  };

  const handleMouseUp = () => {
    clearInterval(holdInterval);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center">
        <span
          onMouseDown={()=>{handleMouseDown("addH",300)}}
          onMouseUp={handleMouseUp}
        >
          <UilAngleDoubleUp />
        </span>
        {format(dateObj, "HH")}
        <span
          onMouseDown={()=>{handleMouseDown("subH",300)}}
          onMouseUp={handleMouseUp}
        >
          <UilAngleDoubleDown />
        </span>
      </div>
      <span className="timeColon">:</span>
      <div className="flex flex-col justify-center items-center">
        <span
          onMouseDown={()=>{handleMouseDown("addM",100)}}
          onMouseUp={handleMouseUp}
        >
          <UilAngleDoubleUp />
        </span>
        {format(dateObj, "mm")}
        <span
          onMouseDown={()=>{handleMouseDown("subM",100)}}
          onMouseUp={handleMouseUp}
        >
          <UilAngleDoubleDown />
        </span>
      </div>
    </div>
  );
};

export default Clock;
