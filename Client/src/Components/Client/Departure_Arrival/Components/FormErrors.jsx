import { useEffect } from "react";

const FormErrors = ({errors}) => {
    useEffect(() => {
        console.log(errors);
    }, [errors]);
    return ( 
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-slate-700/60">
            <div className="w-1/2 h-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center">
                <h1 className="text-3xl text-red-500 font-bold">Error</h1>
                
            </div>
        </div>
    );
}
 
export default FormErrors;