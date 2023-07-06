import { useEffect, useState } from "react";
import Clock from "./Clock";
import Calendar from './Calendar'
import {useDispatch} from "react-redux";
import {setDepartureModifiedTrue, setArrivalModifiedTrue} from "../../../../Redux/Client/dates";

const Frame = ({activate, inputType, setValue, depDate, arrDate}) => {
    
    useEffect(()=>{
        let ID = document.getElementById('topLevel');
        ID.classList.add("overflow-hidden");
    },[])
    
    let [renderTime,setRenderTime] = useState(false);
    
    let dispatcher = useDispatch();


    let close = () => {
        let ID = document.getElementById("topLevel");       
        ID.classList.remove("overflow-hidden");
        activate(false);
    }

    let validateDate = () => {
        setRenderTime(true);
    }

    let validateTime = () => {
        if(inputType == "Departure")
        {
            dispatcher(setDepartureModifiedTrue())
            setValue("DepartureDateTime",depDate)
        }
        else
        {
            dispatcher(setArrivalModifiedTrue())
            setValue("ReturnDateTime",arrDate)
        }
        close();
    }

    return ( 
        <>
            {
                renderTime==true
                ?
                <>
                    <p className="text-xl font-bold capitalize mb-3">{inputType} Time</p>
                    <div className="flex justify-center items-center rounded-full border-2 w-1/2 gap-4 text-xl font-bold">
                        <Clock inputType={inputType}/>
                    </div>
                </>
                :
                <Calendar inputType={inputType}/>
            }
            <div className="flex justify-around items-center w-full mt-3 border-2 rounded-full py-2">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={()=>{renderTime==false?validateDate():validateTime()}}
                >
                    {
                        renderTime == true?
                        "Submit"
                        :
                        "Next"
                    }
                </button>

                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={close}
                >
                    Cancel
                </button>
            </div>
        </>
    );
}
 
export default Frame;