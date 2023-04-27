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
} from "../../../../Redux/dates";
import { useState } from "react";

const Clock = ({inputType}) => {
  const dispatcher = useDispatch();
  const time = useSelector((state) => 
    inputType == "Departure"?
      state.tarvelDates.itinerary.departureTime.value
    :
      state.tarvelDates.itinerary.arrivalTime.value
  );
  const timeObj = parse(time, "HH:mm", new Date());

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
        {format(timeObj, "HH")}
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
        {format(timeObj, "mm")}
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
