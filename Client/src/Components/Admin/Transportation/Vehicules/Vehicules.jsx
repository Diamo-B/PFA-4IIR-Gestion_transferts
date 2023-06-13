import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {SetToast} from "../../../../Redux/toast";
import {
    activateLoading,
    disableLoading,
    setVehicles,
    resetVehicles,
    activateRefetch,
    disableRefetch,
    disableVehicleCreateMode, enableVehicleCreateMode, enableVehicleModifyMode, disableVehicleModifyMode,
} from "../../../../Redux/Transportation";

import ModelChooser from "./ModelChooser";
import TopBar from "./TopBar";
import VehiclesForm from "./VehiclesForm.jsx";

const Vehicules = () => {
    let dispatch = useDispatch();
    let {vehicles, selectedModel, isLoading, createMode, updateMode} = useSelector(
        (state) => state.transportation.vehicules
    );
    let {refetch} = useSelector(state => state.transportation.window);

    useEffect(() => {
        dispatch(activateLoading())
        dispatch(resetVehicles());
        if (selectedModel) {
            fetch(`/api/vehicule/getByModel/${selectedModel.label}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then(async (res) => {
                let response = await res.json();
                if (response.err) {
                    dispatch(SetToast({
                        type: "Error",
                        message: response.err,
                        reload: false
                    }))
                } else
                    dispatch(setVehicles(response))
            }).catch(async (err) => {
                console.error(err);
            })
        }
        dispatch(disableLoading());
        dispatch(disableRefetch());
    }, [selectedModel, refetch])

    let deleteVehicle = (id) => {
        fetch('/api/vehicule/remove', {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                id: id
            })
        }).then(async (res) => {
            let response = await res.json();
            dispatch(activateRefetch());
            dispatch(SetToast({
                type: "Success",
                message: `The vehicle ${response.brand + " " + response.sub_Brand} was deleted successfully!!`,
                reload: false
            }));
        }).catch(async (err) => {
            let error = await err.json();
            if (error.err)
                dispatch(SetToast({
                    type: "Error",
                    message: error.err,
                    reload: false
                }))
            console.error(err);
        })
    }

    const createSchema = yup.object().shape({
        Model: yup.string().required(),
        Brand: yup.string().required(),
        Places: yup
            .number()
            .required("Places is required")
            .positive("Places must be a positive number")
            .integer("Places must be an integer")
            .min(2, "Places must be more or equal 2")
            .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
            .typeError("Places must be a number"),
        Luxe: yup.boolean().required(),
    });

    const updateSchema = yup.object().shape({
        Model: yup.string().notRequired(),
        Brand: yup.string().notRequired(),
        Places: yup
            .number()
            .positive("Places must be a positive number")
            .integer("Places must be an integer")
            .min(2, "Places must be more or equal 2")
            .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
            .typeError("Places must be a number")
            .notRequired(),
        Luxe: yup.boolean().notRequired(),
    });

    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(createMode === true ? createSchema : updateSchema)
    });

    let createVehicle = (data) => {
        console.log(data, selectedModel);
        //TODO: Save Data into Database
        fetch("/api/vehicule/create", {
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                modelID: selectedModel.value,
                brand: data.Brand,
                brandModel: data.Model,
                nbr_places: data.Places,
                luxe: data.Luxe
            })
        }).then(async (res) => {
            let response = await res.json();
            if (response.err)
                dispatch(SetToast({
                    type: "Error",
                    message: response.err,
                    reload: false
                }))
            else {
                dispatch(SetToast({
                    type: "Success",
                    message: `The vehicle ${response.brand + " " + response.sub_Brand} was added successfully!!`,
                    reload: false
                }))
                dispatch(activateRefetch());
            }
        }).catch(async (err) => {
            console.error(err);
            dispatch(SetToast({
                type: "Error",
                message: "An unknown error occurred while adding the vehicle!!",
                reload: false
            }))
        })
        reset();
        dispatch(disableVehicleCreateMode());
    }

    let UpdateVehicle = (data) => {
        console.log(data);
    }

    if (isLoading) {
        return <div className="text-gray-700 font-bold">Loading ...</div>;
    }

    return (
        <div
            className="max-h-full overflow-auto col-span-3 bg-indigo-50 rounded-2xl drop-shadow-lg p-5 flex flex-col gap-5">
            <ModelChooser/>

            <TopBar dispatch={dispatch} selectedModel={selectedModel}/>

            <form className="max-h-full  overflow-y-auto rounded-xl"
                onSubmit={handleSubmit(updateMode.Mode === true ? UpdateVehicle : createVehicle)}
            >
                <table className="w-full text-gray-500 relative text-center">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Model
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Brand
                        </th>
                        <th scope="col" className="px-6 py-3">
                            N° Places
                        </th>
                        <th scope="col" className="px-6 py-3">
                            luxe
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {
                        vehicles?.length > 0 ?
                            vehicles.map((vehicle) => (
                                <tr className="bg-white hover:bg-gray-50 text-gray-900 uppercase"
                                    key={vehicle.id}
                                >
                                    <th className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            />
                                        </div>
                                    </th>                                    
                                    
                                    <th scope="row" className={`${!updateMode.Mode && "px-6 py-4"}`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1"
                                        type="text"
                                        defaultValue={vehicle.sub_Brand}
                                        />
                                    ) : (
                                        vehicle.sub_Brand
                                    )}
                                    </th>
                                    <td className={`${!updateMode.Mode && "px-6 py-4"}`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1"
                                        type="text"
                                        defaultValue={vehicle.brand}
                                        />
                                    ) : (
                                        vehicle.brand
                                    )}
                                    </td>                      
                                    
                                    <td className={`${!updateMode.Mode && "px-6 py-4"}`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1"
                                        min={0}
                                        type="number"
                                        defaultValue={vehicle.places}
                                        />
                                    ) : (
                                        vehicle.places
                                    )}
                                    </td>
                                    
                                    <td className={`${!updateMode.Mode && "px-6 py-4"}`}>
                                        <label className="relative top-1 inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer"
                                                disabled={updateMode.Mode && updateMode.fieldId === vehicle.id ? false : true}
                                                defaultChecked={vehicle.lux}
                                            />
                                            <div
                                                className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </td>
                                    <td className={`${!updateMode.Mode && "px-6 py-4"}`}>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                className="font-bold hover:text-amber-500"
                                                type="button"
                                                onClick={()=>{
                                                    updateMode.Mode && updateMode.fieldId === vehicle.id ?
                                                    dispatch(disableVehicleModifyMode())
                                                    :
                                                    dispatch(enableVehicleModifyMode(vehicle.id))
                                                }}
                                            >
                                                {updateMode.Mode && updateMode.fieldId === vehicle.id ? "Close" :"Update"}
                                            </button>
                                            <button
                                                className="font-bold hover:text-red-500"
                                                type="button"
                                                onClick={() => deleteVehicle(vehicle.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            :
                            //empty row
                            (createMode === false && updateMode === false) &&
                            <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
                                <th className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            disabled={true}
                                        />
                                    </div>
                                </th>
                                <th scope="row" className="px-6 py-4">
                                    ----
                                </th>
                                <td className="px-6 py-4">----</td>
                                <td className="px-6 py-4">----</td>
                                <td className="px-6 py-4">
                                    <label className="relative top-1 inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer"
                                               disabled={true}
                                        />
                                        <div
                                            className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            className="font-bold"
                                        >
                                            ----
                                        </button>
                                        <button
                                            className="font-bold"
                                        >
                                            ----
                                        </button>
                                    </div>
                                </td>
                            </tr>

                    }
                    {
                        (createMode === true && selectedModel !== null) &&
                        <VehiclesForm register={register}/>
                    }
                    </tbody>
                </table>
            </form>
        </div>
    )
        ;
};

export default Vehicules;
