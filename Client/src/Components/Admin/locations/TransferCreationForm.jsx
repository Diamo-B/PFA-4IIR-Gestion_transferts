import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeWindow } from "../../../Redux/locations";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useEffect,useState } from "react";

const TransferCreationForm = () => {
    let disptach = useDispatch();
    let { locations } = useSelector((state) => state.locationPanel);

    const transferSchema = yup.object().shape({
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(transferSchema),
    });

    const onTransferSubmit = (data) => {
        fetch('/api/path/create',{
            method: "post",
            headers:{
                "Content-Type" : "application/json",
                Authorization :`Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                departure: data.Departure,
                arrival: data.Arrival,
                distance: data.Distance,
                price: data.Price
            })
        }).then(async(res)=>{
            let result = await res.json();
            disptach(closeWindow());
        }).catch(err=>{
            console.log(err);
        })
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
                            placeholder="Departure Location"
                            className="text-center font-bold"
                            styles={{
                                container: (baseStyles, state) =>({
                                    ...baseStyles,
                                    width: "100%",
                                    boxShadow:"none",
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    outline: "none",
                                    width: "100%",
                                    border: "2px solid black",
                                    borderRadius: 10 + "px",
                                    boxShadow: state.isFocused ? 'none' : 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                    }
                                }),
                            }}
                            isSearchable={true}
                            isClearable={true}
                            onBlur={onBlur}
                            onChange={(selectedOption) => {
                                setSelectedOption(selectedOption?.value ?? null);
                                onChange(selectedOption?.value ?? null);
                            }}
                            value={options.find((option) => option.value === value)}
                            options={options
                                .filter((option) => option.value !== selectedOption)
                            }
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
                            placeholder="Arrival Location"
                            className="text-center font-bold"
                            styles={{
                                container: (baseStyles, state) =>({
                                    ...baseStyles,
                                    width: "100%",
                                    boxShadow:"none",
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    outline: "none",
                                    width: "100%",
                                    border: "2px solid black",
                                    borderRadius: 10 + "px",
                                    boxShadow: state.isFocused ? 'none' : 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                    }
                                }),
                            }}
                            isSearchable={true}
                            isClearable={true}
                            onBlur={onBlur}
                            onChange={(selectedOption) => {
                                setSelectedOption(selectedOption?.value ?? null);
                                onChange(selectedOption?.value ?? null);
                              }}
                            value={options.find((option) => option.value === value)}
                            options={options
                            .filter((option) => option.value !== selectedOption)
                            }
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
                        placeholder="Distance"
                        className="input font-bold"
                        {...register("Distance")}
                    />
                    <p className="absolute right-3 top-2 text-center font-bold">
                        KM
                    </p>
                    <small className="text-red-600 font-medium">
                        {errors.Distance?.message}
                    </small>
                </div>
                <div className="flex flex-col items-center relative">
                    <input
                        type="text"
                        placeholder="Price"
                        className="input font-bold"
                        {...register("Price")}
                    />
                    <p className="absolute right-3 top-2 text-center font-bold">
                        DH
                    </p>
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

export default TransferCreationForm;
