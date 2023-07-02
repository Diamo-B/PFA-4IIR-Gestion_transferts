import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetFormErrors } from "../../../Redux/extras";

const ErrorsPanel = ({ errors }) => {   
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    let dispatch = useDispatch();

    return (
        <div className="w-full h-full bg-slate-700/75 text-slate-700 text-center absolute top-0 z-50 flex justify-center items-center ">
            <div className="w-6/12 h-5/6 flex flex-col gap-3 py-5 px-2 bg-indigo-200 rounded-xl">
                <div className="flex flex-col h-5/6 w-full justify-center">

                    <div className={`h-1/3 w-full grid grid-cols-7 ${Object.keys(errors).length === 0 ? "grayscale" : ""}`}>
                        <div className="bg-transparent border-r-1 border-b-4 border-white ">
                        </div>

                        <div className="col-span-3 flex justify-center items-center border-4 border-r-2 border-white">
                            <p className="capitalize font-bold text-slate-700">given values</p>
                        </div>

                        <div className="col-span-3 flex justify-center items-center border-4 border-l-2 border-white">
                            <p className="capitalize font-bold text-slate-700">error</p>
                        </div>
                    </div>

                    <div className={`bg-amber-500 h-1/3 w-full grid grid-cols-7 border-b-2 border-l-4 border-white ${Object.keys(errors).includes("label") ? '' : 'grayscale'}`}>
                        <div className="border-r-4 border-white  h-full flex justify-center items-center">
                            <p className="font-bold ">Label</p>
                        </div>

                        <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                            {
                                Object.keys(errors).includes("label") ?
                                (
                                    errors.label.ref.value?
                                        <p>{errors.label.ref.value}</p>
                                    :
                                        <p>No value was given !</p>
                                )
                                :
                                    <p>------</p>
                            }
                        </div>

                        <div className="col-span-3 font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center border-r-4 border-white">
                            {
                                Object.keys(errors).includes("label") ?
                                    <p>{errors.label.message}</p>
                                :
                                    <p>------</p>
                            }
                        </div>

                    </div>

                    <div className={`bg-cyan-500 h-1/3 w-full grid grid-cols-7 border-y-2 border-l-4 border-white ${Object.keys(errors).includes("price") ? '' : 'grayscale'}`}>

                        <div className="border-r-4  border-white h-full flex justify-center items-center">
                            <p className="font-bold ">Price</p>
                        </div>

                        <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                            {
                                Object.keys(errors).includes("price") ?
                                (
                                    errors.price.ref.value?
                                        <p>{errors.price.ref.value}</p>
                                    :
                                        <p>No value was given !</p>
                                )
                                :
                                    <p>------</p>
                            }
                        </div>

                        <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                            {
                                Object.keys(errors).includes("price") ?
                                    <p>{errors.price.message}</p>
                                :
                                    <p>------</p>
                            }
                        </div>

                    </div>

                    <div className={`bg-indigo-500 h-1/3 w-full grid grid-cols-7 border-t-2 border-l-4  border-white ${Object.keys(errors).includes("params") ? '' : 'grayscale'}`}>

                        <div className="border-r-4  h-full flex justify-center items-center">
                            <p className="font-bold ">Params</p>
                        </div>

                        <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                            {
                                Object.keys(errors).includes("params") ?
                                (
                                    errors.params.ref.value?
                                        <p>{errors.params.ref.value}</p>
                                    :
                                        <p>No value was given !</p>
                                )
                                :
                                    <p>------</p>
                            }
                        </div>

                        <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                            {
                                Object.keys(errors).includes("params") ?
                                    <p>{errors.params.message}</p>
                                :
                                    <p>------</p>
                            }
                        </div>

                    </div>
                    <div className="w-full border-y-2 border-white"></div>
                </div>
                <div className="w-full flex-1 flex justify-center">
                    <button className="btn px-20 hover:bg-red-500 hover:border-white hover:text-white"
                        onClick={() => {
                            dispatch(resetFormErrors())
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorsPanel;



