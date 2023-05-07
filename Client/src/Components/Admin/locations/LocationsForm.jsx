import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeWindow } from "../../../Redux/locations"
import { useDispatch } from "react-redux";

const LocationsForm = () => {

    let disptach = useDispatch();

    const locationSchema = yup.object().shape({
        Name: yup
            .string()
            .required("Please provide the Locations's name"),
        Longitude: yup.number().typeError("Longitude needs to be a number"),
        Latitude: yup
            .number().typeError("Latitude needs to be a number")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(locationSchema),
    });
    
    const onLocationSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <form
            className="flex flex-col justify-center gap-5 w-4/6"
            onSubmit={handleSubmit(onLocationSubmit)}
        >
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Location's Name"
                    className="input font-bold"
                    {...register("Name")}
                />
                <small className="text-red-600 font-medium">
                    {errors.Name?.message}
                </small>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Longitude"
                        className="input font-bold"
                        {...register("Longitude")}
                    />
                    <small className="text-red-600 font-medium">
                        {errors.Longitude?.message}
                    </small>
                </div>
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Latitude"
                        className="input font-bold"
                        {...register("Latitude")}
                    />
                    <small className="text-red-600 font-medium">
                        {errors.Latitude?.message}
                    </small>
                </div>
            </div>
            <div className="flex gap-5">
                <button className="btn w-4/6 mx-auto hover:bg-emerald-500 hover:text-white">
                    Submit
                </button>
                <button className="btn w-4/6 mx-auto hover:bg-red-500 hover:text-white"
                    onClick={()=>{disptach(closeWindow())}}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default LocationsForm;
