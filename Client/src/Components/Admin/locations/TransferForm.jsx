import { useForm, Controller, set } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  closeWindow,
  triggerRefetch,
} from "../../../Redux/locations";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";
import { SetToast } from "../../../Redux/toast";

const TransferForm = ({ windowType }) => {
  let disptach = useDispatch();
  let { locations } = useSelector((state) => state.mapPanel.locations);
  let { pathToUpdate } = useSelector((state) => state.mapPanel.paths);
  const transferCreationSchema = yup.object().shape({
    Departure: yup
      .string()
      .required("Please provide the departure location's name"),
    Arrival: yup
      .string()
      .required("Please provide the arrival location's name"),
    Distance: yup
      .number()
      .positive("The distance needs to be a positive value")
      .required("The distance field is required")
      .typeError("The distance needs to be a number"),
    Price: yup
      .number()
      .positive("The price needs to be positive")
      .required("The price field is required")
      .typeError("The Price needs to be a number"),
  });

  const transferUpdateSchema = yup.object().shape({
    Departure: yup.string().nullable().notRequired(),
    Arrival: yup.string().nullable().notRequired(),
    Distance: yup
      .number()
      .nullable()
      .notRequired()
      .positive("The distance needs to be a positive value")
      .transform((value, originalValue) =>
        originalValue === ""
          ? undefined
          : typeof originalValue === "string"
          ? parseFloat(originalValue)
          : value
      ),
    Price: yup
      .number()
      .nullable()
      .notRequired()
      .positive("The distance needs to be a positive value")
      .transform((value, originalValue) =>
        originalValue === ""
          ? undefined
          : typeof originalValue === "string"
          ? parseFloat(originalValue)
          : value
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(
      windowType == "create" ? transferCreationSchema : transferUpdateSchema
    ),
  });

  const onTransferSubmit = (data) => {
    if (windowType === "create") {
      fetch("/api/path/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          departure: data.Departure,
          arrival: data.Arrival,
          distance: data.Distance,
          price: data.Price,
        }),
      })
        .then(async (res) => {
          let result = await res.json();
          disptach(triggerRefetch());
          result.code == "P2002"
            ? disptach(
                SetToast({
                  type: "Error",
                  message:
                    "Another Path with the same departure/arrival combination already exists!!",
                  reload: false,
                })
              )
            : disptach(
                SetToast({
                  type: "Success",
                  message: "A new Path was created successfully!!",
                  reload: false,
                })
              );
          disptach(closeWindow());
        })
        .catch((err) => {
          console.error(err);
          disptach(
            SetToast({
              type: "Error",
              message: err,
              reload: false,
            })
          );
        });
    } else {
      // Use the values from pathToUpdate if left empty
      let recordId = pathToUpdate.id;
      data.Departure = data.Departure ?? pathToUpdate.departureId;
      data.Arrival = data.Arrival ?? pathToUpdate.arrivalId;
      data.Distance = data.Distance ?? pathToUpdate.distance;
      data.Price = data.Price ?? pathToUpdate.price;
      fetch('/api/path/update',{
        method:"put",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
            id:recordId,
            newData:data
        })
      }).then(async(res)=>{
        let response = await res.json();
        disptach(triggerRefetch());
        if(response.err)
        {
          disptach(
            SetToast({
            type: "Error",
            message:response.err,
            reload: false,
            })
          )
        }
        if(response.code == 'P2002') //TODO: Fix this Not Being Shown on existing path error
        {
          disptach(
            SetToast({
              type: "Error",
              message:"There's already an existing path with the given combination of departure/arrival",
              reload: false,
            })
          )
        }
        else
        {
          disptach(
            SetToast({
              type: "Info",
              message:
                "A path was updated successfully !!",
              reload: false,
            })
          );
        }
        disptach(closeWindow());
      }).catch(err=>{
        console.error(err);
        disptach(
          SetToast({
            type: "Error",
            message:
              "An Unknown Error Occured When Modifying The Path!!",
            reload: false,
          })
        );
      })
    }
  };

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    const updatedOptions = locations.map((location) => ({
      value: location.id,
      label: location.name,
    }));
    setOptions(updatedOptions);
  }, [locations]);

  const [updatedSelectOptions, setUpdatedSelectOptions] = useState();

  useEffect(() => {
    if (windowType == "update" && pathToUpdate) {
      setUpdatedSelectOptions({
        departure: pathToUpdate.departureId,
        arrival: pathToUpdate.arrivalId,
      });
    }
  }, []);

  return (
    <form
      className="flex flex-col justify-center gap-5 w-4/6"
      onSubmit={handleSubmit(onTransferSubmit)}
    >
      <div className="flex flex-col items-center">
        <Controller
          name="Departure"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
              inputId="Departure"
              placeholder={
                windowType === "update"
                  ? pathToUpdate.departure.name
                  : "Departure Location"
              }
              className="text-center font-bold"
              styles={{
                container: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "100%",
                  boxShadow: "none",
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  outline: "none",
                  width: "100%",
                  border: "2px solid black",
                  borderRadius: 10 + "px",
                  boxShadow: state.isFocused ? "none" : "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }),
              }}
              isSearchable={true}
              isClearable={true}
              onBlur={onBlur}
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption?.value ?? null);
                selectedOption
                  ? setUpdatedSelectOptions((prev) => {
                      return {
                        departure: selectedOption?.value,
                        arrival: prev?.arrival,
                      };
                    })
                  : setUpdatedSelectOptions((prev) => {
                      return {
                        departure: pathToUpdate.departureId,
                        arrival: prev.arrival,
                      };
                    });
                onChange(selectedOption?.value ?? null);
              }}
              value={options.find((option) => option.value === value)}
              options={options.filter((option) => {
                if (windowType === "create") {
                  return option.value !== selectedOption;
                } else if (windowType === "update") {
                  return (
                    option.value !== selectedOption &&
                    option.value !== updatedSelectOptions.departure &&
                    option.value !== updatedSelectOptions.arrival
                  );
                }
              })}
            />
          )}
        />
        <small className="text-red-600 font-medium">
          {errors.Departure?.message}
        </small>
      </div>
      <div className="flex flex-col items-center">
        <Controller
          name="Arrival"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
              inputId="Arrival"
              placeholder={
                windowType === "update"
                  ? pathToUpdate.arrival.name
                  : "Arrival Location"
              }
              className="text-center font-bold"
              styles={{
                container: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "100%",
                  boxShadow: "none",
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  outline: "none",
                  width: "100%",
                  border: "2px solid black",
                  borderRadius: 10 + "px",
                  boxShadow: state.isFocused ? "none" : "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }),
              }}
              isSearchable={true}
              isClearable={true}
              onBlur={onBlur}
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption?.value ?? null);
                selectedOption
                  ? setUpdatedSelectOptions((prev) => {
                      return {
                        departure: prev.departure,
                        arrival: selectedOption?.value,
                      };
                    })
                  : setUpdatedSelectOptions((prev) => {
                      return {
                        departure: prev.departure,
                        arrival: pathToUpdate.arrivalId,
                      };
                    });
                onChange(selectedOption?.value ?? null);
              }}
              value={options.find((option) => option.value === value)}
              options={options.filter((option) => {
                if (windowType === "create") {
                  return option.value !== selectedOption;
                } else if (windowType === "update") {
                  return (
                    option.value !== selectedOption &&
                    option.value !== updatedSelectOptions.departure &&
                    option.value !== updatedSelectOptions.arrival
                  );
                }
                return true;
              })}
            />
          )}
        />
        <small className="text-red-600 font-medium">
          {errors.Arrival?.message}
        </small>
      </div>
      <div className="flex justify-center gap-5">
        <div className="flex flex-col items-center relative">
          <input
            type="text"
            placeholder={
              windowType === "update" ? pathToUpdate.distance : "Distance"
            }
            className="input font-bold"
            {...register("Distance")}
          />
          <p className="absolute right-3 top-2 text-center font-bold">KM</p>
          <small className="text-red-600 font-medium">
            {errors.Distance?.message}
          </small>
        </div>
        <div className="flex flex-col items-center relative">
          <input
            type="text"
            placeholder={windowType === "update" ? pathToUpdate.price : "Price"}
            className="input font-bold"
            {...register("Price")}
          />
          <p className="absolute right-3 top-2 text-center font-bold">DH</p>
          <small className="text-red-600 font-medium">
            {errors.Price?.message}
          </small>
        </div>
      </div>
      <div className="flex gap-5">
        <button className="btn w-4/6 mx-auto hover:bg-emerald-500 hover:text-white">
          Submit
        </button>
        <button
          className="btn w-4/6 mx-auto hover:bg-red-500 hover:text-white"
          onClick={() => {
            disptach(closeWindow());
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransferForm;
