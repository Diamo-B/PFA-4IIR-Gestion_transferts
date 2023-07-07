import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ErrorsPanel = ({ errors, depDate, arrDate, clearErrors }) => {
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  let dispatch = useDispatch();

  return (
    <div className="w-full h-full bg-slate-700/75 text-slate-700 text-center absolute top-0 left-0 z-50 flex justify-center items-center ">
      <div className="w-6/12 h-5/6 flex flex-col gap-3 py-5 px-2 bg-indigo-200 rounded-xl">
        <div className="flex flex-col h-full w-full justify-center items-center">
          <div
            className={`h-1/3 w-full grid grid-cols-7 ${
              Object.keys(errors).length === 0 ? "grayscale" : ""
            }`}
          >
            <div className="bg-transparent border-r-1 border-b-4 border-white "></div>

            <div className="col-span-3 flex justify-center items-center border-4 border-r-2 border-white">
              <p className="capitalize font-bold text-slate-700">
                given values
              </p>
            </div>

            <div className="col-span-3 flex justify-center items-center border-4 border-l-2 border-white">
              <p className="capitalize font-bold text-slate-700">error</p>
            </div>
          </div>

          <div
            className={`bg-amber-500 h-1/3 w-full grid grid-cols-7 border-b-2 border-l-4 border-white ${
              Object.keys(errors).includes("Departure") ? "" : "grayscale"
            }`}
          >
            <div className="border-r-4 border-white  h-full flex justify-center items-center">
              <p className="font-bold ">Place of Departure</p>
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("Departure") ? (
                errors.Departure.ref.value ? (
                  <p>{errors.Departure.ref.value}</p>
                ) : (
                  <p>No value was given !</p>
                )
              ) : (
                <p>------</p>
              )}
            </div>

            <div className="col-span-3 font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center border-r-4 border-white">
              {Object.keys(errors).includes("Departure") ? (
                <p>{errors.Departure.message}</p>
              ) : (
                <p>------</p>
              )}
            </div>
          </div>

          <div
            className={`bg-cyan-500 h-1/3 w-full grid grid-cols-7 border-y-2 border-l-4 border-white ${
              Object.keys(errors).includes("Arrival") ? "" : "grayscale"
            }`}
          >
            <div className="border-r-4  border-white h-full flex justify-center items-center">
              <p className="font-bold ">Place of Arrival</p>
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("Arrival") ? (
                errors.Arrival.ref.value ? (
                  <p>{errors.Arrival.ref.value}</p>
                ) : (
                  <p>No value was given !</p>
                )
              ) : (
                <p>------</p>
              )}
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("Arrival") ? (
                <p>{errors.Arrival.message}</p>
              ) : (
                <p>------</p>
              )}
            </div>
          </div>

          <div
            className={`bg-indigo-500 h-1/3 w-full grid grid-cols-7 border-t-2 border-l-4  border-white ${
              Object.keys(errors).includes("ReturnDateTime") ? "" : "grayscale"
            }`}
          >
            <div className="border-r-4  h-full flex justify-center items-center">
              <p className="font-bold ">Return Date & Time</p>
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
                {
                    Object.keys(errors).includes("ReturnDateTime") ? (
                        depDate && arrDate ? (
                            <>
                                <div className="border-b-2 w-full h-full border-white flex justify-center items-center"> {/* Added div with border-bottom */}
                                    <p>Departure: {format(depDate, "dd-MM-yyyy") + " at " + format(depDate, "HH:mm")}</p>
                                </div>
                                <div className="border-t-2 w-full h-full border-white flex justify-center items-center"> {/* Added padding to the top of second div */}
                                    <p>Arrival: {format(arrDate, "dd-MM-yyyy") + " at " + format(arrDate, "HH:mm")}</p>
                                </div>    
                            </>
                        ) : (
                        <p>No value was given !</p>
                        )
                        ) : (
                        <p>------</p>
                    )
                }
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("ReturnDateTime") ? (
                <p>{errors.ReturnDateTime.message}</p>
              ) : (
                <p>------</p>
              )}
            </div>
          </div>

          <div
            className={`bg-rose-500 h-1/3 w-full grid grid-cols-7 border-y-2 border-l-4 border-white ${
              Object.keys(errors).includes("travelers") ? "" : "grayscale"
            }`}
          >
            <div className="border-r-4  border-white h-full flex justify-center items-center">
              <p className="font-bold capitalize">travelers</p>
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("travelers") ? (
                errors.travelers.ref.value ? (
                  <p>{errors.travelers.ref.value}</p>
                ) : (
                  <p>No value was given !</p>
                )
              ) : (
                <p>------</p>
              )}
            </div>

            <div className="col-span-3 border-r-4 border-white font-bold overflow-x-auto thin-scrollbar px-1 grid place-items-center">
              {Object.keys(errors).includes("travelers") ? (
                <p>{errors.travelers.message}</p>
              ) : (
                <p>------</p>
              )}
            </div>
          </div>
          <div className="w-full border-y-2 border-white"></div>
          <button
            className="btn h-10 w-fit mt-5 px-20 hover:bg-red-500 hover:border-white hover:text-white"
            onClick={() => {clearErrors()}}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorsPanel;
