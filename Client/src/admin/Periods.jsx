import Toast from "../Components/Toast/Toast";
import Calendar from "../Components/Admin/Periods/Calendar";
import Table from "../Components/Admin/Periods/Table";
import useDatesError from "../Components/Admin/Periods/hooks/gen/useDatesError";
import useKeyboardEsc from "../Components/Admin/Periods/hooks/gen/useKeyboardEsc";
import useCreatePeriod from "../Components/Admin/Periods/hooks/gen/useCreatePeriod";

import { useEffect, useState } from "react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useYupSchemas  from "../Components/Admin/Periods/hooks/gen/useYupSchemas";

import { useSelector, useDispatch } from "react-redux";
import {
  setReadOnly,
  enableEndingDate,
  enableStartingDate,
} from "../Redux/periods";
import { disableToast } from "../Redux/toast";
import { parse } from "date-fns";


const Periods = () => {
  let [datesError, setDatesError] = useState(false);

  let { readOnly, startingDate, endingDate } = useSelector(
    (state) => state.periods
  );
  let { toast } = useSelector((state) => state.toast);

  let dispatch = useDispatch();

  const { createSchema, updateSchema } = useYupSchemas();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema)
  });

  //? create period function from custom hook
  const { createPeriod } = useCreatePeriod();
  const submit = (data) => {
    console.log("entred");
    createPeriod(data, reset);
  };

  //? esc button <==> remove readOnly status (stop selecting dates)
  useKeyboardEsc();

  //? dates error handeling
  useDatesError(setDatesError, setError, getValues, clearErrors, errors);

  return (
    <>
      <div className="w-full h-full flex gap-5 px-10 py-5">
        <div className="bg-white w-full rounded-xl relative  overflow-y-auto">
          <form
            className="text-black m-3 py-5 flex flex-col justify-center items-center gap-5 border-4 border-slate-200 rounded-xl relative"
            onSubmit={handleSubmit(submit)}
          >
            {readOnly === true && !datesError && (
              <div className="absolute w-full h-full rounded-lg bg-slate-600/90 z-50 flex justify-center items-center">
                <h1 className="text-4xl font-medium text-white">
                  {startingDate.active && "Select A Starting Date"}
                  {endingDate.active && "Select An Ending Date"}
                </h1>
              </div>
            )}
            <input
              type="text"
              className="input w-1/2 text-center text-lg"
              placeholder="Period's Name"
              {...register("name")}
            />
            {errors.name && (
              <small className="text-red-500 font-bold">
                {errors.name.message}
              </small>
            )}
          
            <div className="w-1/2 flex justify-center items-center gap-5 ">
              <div className="flex flex-col w-full justify-center items-center">
                <input
                  type="text"
                  className={`input text-center text-lg ${
                    datesError && "border-red-500"
                  }`}
                  placeholder="Starting Date"
                  readOnly={readOnly}
                  onFocus={() => {
                    if (datesError) {
                      setDatesError(false);
                    }
                    dispatch(setReadOnly(true));
                    dispatch(enableStartingDate());
                  }}
                  {...register("startingDate")}
                />
                {errors.startingDate && (
                  <small className="text-red-500 font-bold">
                    {errors.startingDate.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <input
                  type="text"
                  className={`input text-center text-lg ${
                    datesError && "border-red-500"
                  }`}
                  placeholder="Ending Date"
                  readOnly={readOnly}
                  onFocus={() => {
                    if (datesError) {
                      setDatesError(false);
                    }
                    dispatch(setReadOnly(true));
                    dispatch(enableEndingDate());
                  }}
                  {...register("endingDate")}
                />
                {errors.endingDate && (
                  <small className="text-red-500 font-bold">
                    {errors.endingDate.type !== "custom"
                      ? errors.endingDate.message
                      : ""}
                  </small>
                )}
              </div>
            </div>
            {errors.endingDate && (
              <div className="w-full text-center">
                <small className="text-red-500 font-bold">
                  {errors.endingDate.type === "custom"
                    ? errors.endingDate.message
                    : ""}
                </small>
              </div>
            )}
            <div className="flex flex-col justify-center items-center">
              <input
                className="input text-center text-lg"
                type="text"
                placeholder="Price"
                {...register("price")}
              />
              {errors.price && (
                <small className="text-red-500 font-bold">
                  {errors.price.message}
                </small>
              )}
            </div>
            <button
              className="btn px-5 hover:bg-emerald-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent     disabled:hover:text-black" 
              type="submit"
              disabled={datesError || Object.keys(errors).length > 0 }
              onClick={() => dispatch(setReadOnly(null))}
            >
              Add Period
            </button>
          </form>
          <div className="rounded-b-xl">
            <Table />
          </div>
        </div>
        <div className=" w-1/2 h-full flex items-center">
          <div
            className={`w-full text-black p-5 rounded-xl ${
              readOnly ? "bg-white" : "bg-slate-200"
            }`}
          >
            <Calendar setValue={setValue} />
          </div>
        </div>
      </div>
      <div className="bg-red-500">
        {toast.active && (
          <Toast
            Type={toast.type}
            Message={toast.message}
            trigger={disableToast}
            reload={toast.reload}
          />
        )}
      </div>
    </>
  );
};

export default Periods;
