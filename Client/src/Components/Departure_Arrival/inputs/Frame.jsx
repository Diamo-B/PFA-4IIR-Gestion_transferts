import { useEffect, useState } from "react";
import Clock from "./Components/Clock";
import Calendar from './Components/Calendar'

const Frame = ({activate, inputType}) => {
    let [renderTime,setRenderTime] = useState(false);

    useEffect(()=>{
        let ID = document.getElementById('topLevel');
        ID.classList.add("overflow-hidden");
    },[])

    let close = () => {
        let ID = document.getElementById("topLevel");       
        ID.classList.remove("overflow-hidden");
        activate(false);
    }

    let submitData = () => {
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
                        <Clock/>
                    </div>
                </>
                :
                <Calendar inputType={inputType}/>
            }
            <div className="flex justify-around items-center w-full mt-3 border-2 rounded-full py-2">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={()=>{renderTime==false?setRenderTime(true):submitData()}}
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