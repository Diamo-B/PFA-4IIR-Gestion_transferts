import { useEffect, useState, useMemo } from "react";
import Input from "./inputs/Input";
import {
  UilSearch,
  UilMapMarker,
  UilCalender,
  UilUserPlus,
  UilCarSideview,
} from "@iconscout/react-unicons";
import Frame from "./inputs/Frame";
import { useSelector, useDispatch } from "react-redux";
import {
  compareDepartureWithArrival,
  resetImproperDate,
} from "../../Redux/dates";
import { format } from "date-fns";

const ChoixTraget = () => {
  const dispatcher = useDispatch();
  const [showFrame, setShowFrame] = useState(false);
  const [inputType, setInputType] = useState("");
  const departureDate = useSelector(
    (state) => state.travelDates.itinerary.departureDate
  );
  const arrivalDate = useSelector(
    (state) => state.travelDates.itinerary.arrivalDate
  );

  //explain: turning the date from a unixSerializable to date objects
  const depDateValue = useMemo(
    () => new Date(departureDate.value),
    [departureDate.value]
  );
  const arrDateValue = useMemo(
    () => new Date(arrivalDate.value),
    [arrivalDate.value]
  );

  let [depDate, setDepDate] = useState(depDateValue);
  let [arrDate, setArrDate] = useState(arrDateValue);

  useEffect(() => {
    setDepDate(depDateValue);
  }, [depDateValue]);

  useEffect(() => {
    setArrDate(arrDateValue);
  }, [arrDateValue]);

  const improperDates = useSelector(
    (state) => state.travelDates.itinerary.improperDates.value
  );

  let VerifyData = () => {
    dispatcher(resetImproperDate());
    dispatcher(compareDepartureWithArrival());
  };


  return (
    <div className=" w-5/6 h-36 bg-white rounded-xl dark:bg-slate-700">
      <div className="grid grid-cols-10 w-full h-full">
        <div className="h-full w-full col-span-9 px-3">
          <div className="flex justify-center items-center h-1/2 gap-3">
            <Input
              placeholder="Place of departure"
              type="text"
              icon={<UilMapMarker className="absolute left-2" />}
            />

            <Input
              placeholder={
                departureDate.isModified == false
                  ? format(depDate, "dd-MM-yyyy") +
                    " " +
                    format(depDate, "HH:mm")
                  : ""
              }
              value={
                departureDate.isModified == true
                  ? format(depDate, "dd-MM-yyyy") +
                    " " +
                    format(depDate, "HH:mm")
                  : ""
              }
              type="text"
              icon={<UilCalender className="absolute left-2" />}
              activate={setShowFrame}
              setInputType={setInputType}
              inptype="Departure"
            />

            <Input
              placeholder="Travelers"
              type="number"
              icon={<UilUserPlus className="absolute left-2" />}
            />
          </div>

          <div className="flex justify-center items-center h-1/2 gap-3">
            <Input
              placeholder="Arrival point"
              type="text"
              icon={<UilMapMarker className="absolute left-2" />}
            />

            <Input
              placeholder={
                arrivalDate.isModified == false ?
                  format(arrDate, "dd-MM-yyyy") + " " + format(arrDate, "HH:mm")
                :
                  ""
              }
              value={
                arrivalDate.isModified == true ?
                  format(arrDate, "dd-MM-yyyy") + " " + format(arrDate, "HH:mm")
                :
                  ""
              }
              type="text"
              icon={<UilCalender className="absolute left-2" />}
              activate={setShowFrame}
              setInputType={setInputType}
              inptype="Return"
            />

            <Input
              placeholder="Category"
              type="Category"
              icon={<UilCarSideview className="absolute left-2" />}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" flex items-center justify-center gap-2 border-2 bg-indigo-300 rounded-r-lg w-full h-full text-black text-lg font-bold hover:bg-indigo-400 hover:text-white dark:bg-slate-700"
            onClick={VerifyData}
          >
            Search
            <UilSearch />
          </button>
        </div>
      </div>
      {showFrame && (
        <div className="absolute flex flex-col justify-center items-center w-full h-full bg-slate-500 bg-opacity-70 left-0 top-0">
          <div className="w-2/6 min-w-min bg-white p-4 flex flex-col items-center rounded-2xl">
            <Frame inputType={inputType} activate={setShowFrame} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoixTraget;
