import { useState } from "react";
import Calendar from "../Components/Admin/Periods/Calendar";
import Table from '../Components/Admin/Periods/Table';
const Periods = () => {
    let [readOnly, setReadOnly] = useState(false);
    return ( 
        <>
            <div className="w-full h-full flex gap-5 px-10 py-5">
                <div className="bg-white w-full rounded-xl overflow-y-auto relative">
                    <form className="text-black m-3 py-5 flex flex-col justify-center items-center gap-5 border-4 border-slate-200 rounded-xl relative">
                        {
                            readOnly
                            &&
                            <div className="absolute w-full h-full rounded-lg bg-slate-600/90 z-50 flex justify-center items-center">
                                <h1 className="text-4xl font-medium text-white">Select A Date From The Calendar</h1>
                            </div>
                        }
                        <input type="text" className="input w-1/2 text-center text-lg" placeholder="Period's Name"/>
                        <div className="w-1/2 flex justify-center items-center gap-5 ">
                            <input type="text" className="input text-center text-lg" placeholder="Starting Date" readOnly={readOnly} onFocus={()=>setReadOnly(true)} onBlur={()=>setReadOnly(false)}/>
                            <input type="text" className="input text-center text-lg" placeholder="Ending Date" readOnly={readOnly} onFocus={()=>setReadOnly(true)} onBlur={()=>setReadOnly(false)}/>
                        </div>
                        <button className="btn px-5 hover:bg-emerald-500 hover:text-white">
                            Add Period
                        </button>
                    </form>
                    <div className="rounded-b-xl">
                        <Table/>
                    </div>
                </div>
                <div className=" w-1/2 h-full flex items-center">
                    <div className="w-full bg-white text-black p-5 rounded-xl">
                        <Calendar/>
                    </div>
                </div>
            </div>    
        </>   
    );
}
 
export default Periods;