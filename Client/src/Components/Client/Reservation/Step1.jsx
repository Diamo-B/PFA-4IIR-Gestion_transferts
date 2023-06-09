import { useEffect, useState, useMemo } from "react";
import Input from "./Components/Input";
import {
  UilArrowRight,
  UilMapMarker,
  UilCalender,
  UilUserPlus,
  UilCalendarSlash ,
} from "@iconscout/react-unicons";
import { format } from "date-fns";
import LocationInput from "./Components/LocationInput";
import { Controller, useFormContext } from 'react-hook-form';
import LuxuryCheckbox from "./Components/LuxuryCheckBox";
import { activateStep2 } from "../../../Redux/Client/Reservation";
import Frame from "./Components/Frame";
import { useSelector, useDispatch } from "react-redux";
import useFetchPaths from "./hooks/useFetchPaths";
import FormErrors from "./Components/formErrors";


const Step1 = () => {
    const dispatcher = useDispatch();

    //********************Data****************************
    //? fetches the data of active paths from the server then organizes it
    let {fetchActivePaths} = useFetchPaths();
    let { distinctDepartures, distinctArrivals } = useSelector(state => state.activePaths);

    useEffect(() => {
        fetchActivePaths();
    }, []);
    //*****************Calendar.Clock*******************************
    const [showFrame, setShowFrame] = useState(false);
    const [inputType, setInputType] = useState("");
  
    const {departureDate} = useSelector((state) => state.travelDates.itinerary);
    const {arrivalDate} = useSelector((state) => state.travelDates.itinerary);
  
    //? explain: turning the date from a unixSerializable to date objects
    const depDateValue = useMemo(() => new Date(departureDate.value),[departureDate.value]);
    const arrDateValue = useMemo(() => new Date(arrivalDate.value),[arrivalDate.value]);
  
    let [depDate, setDepDate] = useState(depDateValue);
    let [arrDate, setArrDate] = useState(arrDateValue);
  
    useEffect(() => {
      setDepDate(depDateValue);
    }, [depDateValue]);
  
    useEffect(() => {
      setArrDate(arrDateValue);
    }, [arrDateValue]);

    //*******************Form*****************************
    const {
        register, formState: { errors }, control, setValue, resetField, clearErrors, trigger
    } = useFormContext()


    return ( 
    <div className="w-full h-full flex-grow flex justify-center items-center">
        <div className=" w-5/6 h-36 border-2 border-indigo-400 bg-white rounded-xl dark:bg-slate-500">
            <div className="grid grid-cols-10 w-full h-full">
                <div className="h-full w-full col-span-9 px-3">
                <div className="flex justify-center items-center h-1/2 gap-3">

                    <LocationInput 
                    inputRegisterName="Departure" 
                    control={control}
                    placeholder="Place of departure"
                    options={distinctDepartures}
                    icon={<UilMapMarker className="absolute top-2 left-2 z-0" />}  
                    />

                    <Controller
                    name="DepartureDateTime"
                    control={control}
                    render={({ field }) => (
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
                        resetField={resetField}
                        formName = "DepartureDateTime"
                        field = {field}
                        />
                    )}
                    />

                    <div className="flex w-full h-full justify-center items-center relative">
                    <input
                        placeholder="Travelers"
                        defaultValue={1}
                        type="number"
                        className="border-2 border-black rounded-lg w-full h-3/5 text-center"
                        {...register("travelers")}
                    />
                    <UilUserPlus className="absolute left-2" />
                    </div>

                </div>

                <div className="flex justify-center items-center h-1/2 gap-3">

                    <LocationInput 
                    inputRegisterName="Arrival" 
                    placeholder="Place of Arrival"
                    control={control}
                    options={distinctArrivals}
                    icon={<UilMapMarker className="absolute top-2 left-2 z-0" />}  
                    />

                    <Controller
                    name="ReturnDateTime"
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder={
                            "Click To Choose A Return Date"
                            }
                            value={
                            arrivalDate.isModified === true
                                ? format(arrDate, "dd-MM-yyyy") + " " + format(arrDate, "HH:mm")
                                : ""
                            }
                            type="text"
                            icon={arrivalDate.isModified ? <UilCalender className="absolute left-2" /> : <UilCalendarSlash className="absolute left-2" />}
                            activate={setShowFrame}
                            setInputType={setInputType}
                            inptype="Return"
                            formName = "ReturnDateTime"
                            field = {field}
                        />
                    )}
                    />

                    <LuxuryCheckbox 
                    inputRegisterName="luxury" 
                    control={control}
                    />
                </div>
                </div>
                <div className="flex justify-center items-center">
                <button
                    className=" flex items-center justify-center gap-2 border-2 bg-indigo-300 rounded-r-lg w-full h-full text-black text-lg font-bold hover:bg-indigo-400 hover:text-white dark:bg-slate-400"
                    type="button"
                    onClick={async ()=> {
                        let result = await trigger(["Departure", "Arrival", "DepartureDateTime", "ReturnDateTime", "travelers", "luxury"])
                        if(result)
                            dispatcher(activateStep2());
                    }}
                >
                    Next
                    <UilArrowRight />
                </button>
                </div>
            </div>
        </div>
        {
        showFrame 
        && 
        <div className="absolute flex flex-col justify-center items-center w-full h-full bg-slate-500 bg-opacity-70 left-0 top-0">
            <div className="w-2/6 min-w-min bg-white p-4 flex flex-col items-center rounded-2xl">
            <Frame inputType={inputType} activate={setShowFrame} setValue={setValue} depDate={depDate} arrDate={arrDate}/>
            </div>
        </div>
        }
        {
            Object.entries(errors).length > 0 &&
            <FormErrors errors={errors} depDate={depDate} arrDate={arrDate} clearErrors={clearErrors} />
        }
    </div>
    );
}
 
export default Step1;