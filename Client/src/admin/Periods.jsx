import Toast from "../Components/Toast/Toast";
import Calendar from "../Components/Admin/Periods/Calendar";
import Table from "../Components/Admin/Periods/Table";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { parse, isAfter } from "date-fns";

import { useSelector, useDispatch } from "react-redux";
import {
  setReadOnly,
  enableEndingDate,
  enableStartingDate,
  disableStartingDate,
  disableEndingDate,
  enableRefetch,
} from "../Redux/periods";
import { SetToast, disableToast } from "../Redux/toast";

const Periods = () => {
  let [datesError, setDatesError] = useState(false);

  let { readOnly, startingDate, endingDate } = useSelector(
    (state) => state.periods
  );
  let { toast } = useSelector((state) => state.toast);

  let dispatch = useDispatch();

  let schema = yup.object().shape({
    name: yup.string().required("Period's name is required"),
    price: yup
      .number()
      .required("Price is required")
      .typeError("Price must be a number")
      .positive("Price must be greater than 0"),
    startingDate: yup
      .date()
      .required("Starting date is required")
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      }),
    endingDate: yup
      .date()
      .required("Ending date is required")
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      })
  });

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
    resolver: yupResolver(schema)
  });

  let createPeriod = (data) => {
    console.log(data);
    fetch("/api/period/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        label: data.name,
        startDate: data.startingDate,
        endDate: data.endingDate,
        price: data.price,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if(response.message)
          dispatch(
            SetToast({
              message: response.message,
              type: "Error",
              reload: false,
            })
          );
        else
        {
          dispatch(
            SetToast({
              message: `The ${response.label} period was created successfully`,
              type: "Success",
              reload: false,
            })
          );
          dispatch(enableRefetch());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          SetToast({
            message: "An unknown error has occurred",
            type: "Error",
            reload: false,
          })
        );
      });
      reset();
  };

  //? esc button <==> remove read only
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        dispatch(setReadOnly(false));
        dispatch(disableStartingDate());
        dispatch(disableEndingDate()); 
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  //? dates error handeling
  useEffect(() => {
    const start = getValues("startingDate");
    const end = getValues("endingDate");
    if(start && end && !isAfter(parse(end,"dd-MM-yyyy", new Date()), parse(start,"dd-MM-yyyy", new Date()))){
      if(errors.endingDate?.type === "custom") return;
      setError(
        "endingDate",
        { type: "custom", message: "Ending date must be after starting date" },
        { shouldFocus: false }
      );
      setDatesError(true);
      dispatch(disableStartingDate());
      dispatch(disableEndingDate());
    }
    else
    {
      clearErrors("endingDate");
      setDatesError(false);
    }
  }, [startingDate.active, endingDate.active]);


  return (
    <>
      <div className="w-full h-full flex gap-5 px-10 py-5">
        <div className="bg-white w-full rounded-xl relative  overflow-y-auto">
          <form
            className="text-black m-3 py-5 flex flex-col justify-center items-center gap-5 border-4 border-slate-200 rounded-xl relative"
            onSubmit={handleSubmit(createPeriod)}
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
                      setDatesError(null);
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
                      setDatesError(null);
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
              disabled={datesError || errors.name || errors.startingDate || errors.endingDate || errors.price }
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
