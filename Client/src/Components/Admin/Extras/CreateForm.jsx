import { useDispatch,useSelector } from "react-redux";
import { disableCreateMode } from "../../../Redux/extras";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchema } from "./YupSchemas"; 
import useExtrasManipulation from "./Hooks/useExtrasManipulation";

const CreateForm = () => {
    let dispatch = useDispatch();
    let { selectedType } = useSelector((state) => state.extras);
    let { createExtra } = useExtrasManipulation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createSchema),
    });

    const onSubmitdata = (data) => {
        dispatch(disableCreateMode());
        createExtra(data, selectedType);
    };

    return (
        <div className="h-full w-full z-40 absolute top-0 left-0 py-16 px-auto bg-slate-500/90">
            <form className="h-full w-1/2 mx-auto p-10 bg-indigo-50 rounded-xl text-center text-slate-700 "
                onSubmit={handleSubmit(onSubmitdata)}
            >
                <h1 className="font-bold text-2xl">Create A New {selectedType} Extra</h1>
                <div className={`flex flex-col justify-center items-center mt-10`}>
                    <div className="flex flex-col justify-center items-center">
                        <label className="font-semibold text-lg">Label</label>
                        <input
                            type="text"
                            className="input w-80 h-10 mt-2 font-bold"
                            {...register("label")}
                        />
                        {
                            errors.label && <small className="text-red-500 font-semibold">{errors.label.message}</small>
                        }
                    </div>
                    <div className="flex flex-col justify-center items-center mt-5">
                        <label className="font-semibold text-lg">Price</label>
                        <input
                            type="text"
                            className="input w-80 h-10 mt-2 font-bold"
                            {...register("price")}
                        />
                    </div>
                    {
                        errors.price && <small className="text-red-500 font-semibold">{errors.price.message}</small>
                    }
                    <div className="flex flex-col justify-center items-center mt-5">
                        <label className="font-semibold text-lg">Params</label>
                        <textarea className={`input w-80 ${Object.keys(errors).length !== 0? "max-h-20 h-20" : "max-h-32 h-32"} font-bold text-left px-2 mt-2`}
                            {...register("params")}
                        >
                        </textarea>
                    </div>
                    {
                        errors.params && <small className="text-red-500 font-semibold">{errors.params.message}</small>
                    }
                </div>

                <div className="flex justify-around mt-5">
                    <button type="submit" className="btn px-9 hover:bg-emerald-500 hover:text-white">
                        Submit
                    </button>
                    <button className="btn px-10 hover:bg-red-500 hover:text-white"
                        onClick={() => dispatch(disableCreateMode())}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;
