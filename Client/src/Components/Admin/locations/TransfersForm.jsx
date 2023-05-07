import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeWindow } from "../../../Redux/locations"
import { useDispatch } from "react-redux";

const TranfersForm = () => {

    let disptach = useDispatch();

    const transferSchema = yup.object().shape({
        Departure: yup
            .string()
            .required("Please provide the departure location's name"),
        Arrival: yup
            .string()
            .required("Please provide the arrival location's name"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(transferSchema),
    });

    const onTransferSubmit = (data) => {
        console.log(data);
    };

    
    return (
        <form
            className="flex flex-col justify-center gap-5 w-4/6"
            onSubmit={handleSubmit(onTransferSubmit)}
        >
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Departure Location"
                    className="input font-bold"
                    {...register("Departure")}
                />
                <small className="text-red-600 font-medium">
                    {errors.Departure?.message}
                </small>
            </div>
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Arrival Location"
                    className="input font-bold"
                    {...register("Arrival")}
                />
                <small className="text-red-600 font-medium">
                    {errors.Arrival?.message}
                </small>
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

export default TranfersForm;
