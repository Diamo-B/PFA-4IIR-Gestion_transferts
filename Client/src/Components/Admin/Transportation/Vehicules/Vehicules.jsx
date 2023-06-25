import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {SetToast} from "../../../../Redux/toast";
import {
    activateLoading,
    disableLoading,
    setVehicles,
    resetVehicles,
    activateRefetch,
    disableRefetch,
    disableVehicleCreateMode, enableVehicleModifyMode, disableVehicleModifyMode, setSelectedModel, setSelectedVehicles,
} from "../../../../Redux/Transportation";

import {createSchema, updateSchema} from "./vehiclesComponents/yupSchemas";
import ModelChooser from "./ModelChooser";
import TopBar from "./TopBar";
import VehiclesForm from "./VehiclesForm.jsx";

const Vehicules = () => {
    let dispatch = useDispatch();
    let {vehicles, selectedModel, selectedVehicles, isLoading, createMode, updateMode} = useSelector(
        (state) => state.transportation.vehicules
    );
    const generalCheckbox = useRef();
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

    let deleteSelectedVehicles = () => {
        fetch('/api/vehicule/removeMany', {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                Ids: selectedVehicles
            })
        }).then(async (res) => {
            let response = await res.json();
            dispatch(activateRefetch());
            dispatch(SetToast({
                type: "Success",
                message: `The selected vehicles were deleted successfully!!`,
                reload: false
            }));
        }).catch(async (error) => {
            let err = await error.json();
            if (err.error)
                dispatch(SetToast({
                    type: "Error",
                    message: err.error,
                    reload: false
                }))
            console.error(err);
        })
        generalCheckbox.current.checked = false;
    }

    let addOrRemoveSelection = (e, id) =>{
        if(e.target.checked)
            dispatch(setSelectedVehicles([ id, ...selectedVehicles]))
        else
            dispatch(setSelectedVehicles(selectedVehicles.filter((item) => item !== id)));
    }

    let addOrRemoveAll = (e) =>{
        if(e.target.checked)
            dispatch(setSelectedVehicles(vehicles.map((item) => item.id)));
        else
            dispatch(setSelectedVehicles([]));
    }


    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(createMode === true ? createSchema : updateSchema)
    });
    //shows form errors
    useEffect(() => {
        const errorMessages = Object.values(errors)
          .map((error) => error.message)
          .filter(Boolean)
          .join('\n');
      
        if (errorMessages) {
          dispatch(
            SetToast({
              type: "Error",
              message: errorMessages,
              reload: false,
            })
          );
        }
      }, [errors]);

    let createVehicle = (data) => {
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
                luxe: data.LuxuryCreate
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
                    message: `The new vehicle ${response.brand + " " + response.sub_Brand} was added successfully!!`,
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
        fetch("/api/vehicule/update", {
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: updateMode.fieldId,
                brand: data.Brand,
                subBrand: data.Model,
                places: data.Places,
                lux: data.Luxury
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
                    message: `The vehicle ${response.updatedVehicule.brand + " " + response.updatedVehicule.sub_Brand} was updated successfully!!`,
                    reload: false
                }))
                dispatch(activateRefetch());
            }
        }).catch(async (err) => {
            console.error(err);
            dispatch(SetToast({
                type: "Error",
                message: "An unknown error occurred while updating the vehicle!!",
                reload: false
            }))
        })
        reset();
        dispatch(disableVehicleModifyMode());
    }

    if (isLoading) {
        return <div className="text-gray-700 font-bold">Loading ...</div>;
    }

    return (
        <div
            className="max-h-full overflow-auto col-span-3 bg-indigo-50 rounded-2xl drop-shadow-lg p-5 flex flex-col gap-5">
            <ModelChooser/>

            <TopBar dispatch={dispatch} selectedModel={selectedModel} selectedVehicles={selectedVehicles} deleteSelectedVehicles={deleteSelectedVehicles}/>

            <form className="max-h-full  overflow-y-auto rounded-xl"
                onSubmit={updateMode.Mode == true ? handleSubmit(UpdateVehicle) : handleSubmit(createVehicle)}
            >
                <table className="w-full text-gray-500 relative text-center">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                    onChange={(e) => addOrRemoveAll(e)}
                                    ref={generalCheckbox}
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
                                <tr className={`text-gray-900 uppercase ${updateMode.Mode && updateMode.fieldId === vehicle.id ? "bg-slate-100" : "bg-white hover:bg-gray-50"}`}
                                    key={vehicle.id}
                                >
                                    <th className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                checked={selectedVehicles.includes(vehicle.id)}
                                                onChange={(e) => {
                                                  addOrRemoveSelection(e, vehicle.id);  
                                                }}
                                            />
                                        </div>
                                    </th>                                    
                                    
                                    <th scope="row" className={`px-6 py-4`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1 rounded-lg bg-transparent"
                                        autoFocus={true}
                                        type="text"
                                        defaultValue={vehicle.sub_Brand}
                                        {...register("Model")}
                                        />
                                    ) : (
                                        vehicle.sub_Brand
                                    )}
                                    </th>
                                    <td className={`px-6 py-4`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1 rounded-lg bg-transparent"
                                        type="text"
                                        defaultValue={vehicle.brand}
                                        {...register("Brand")}
                                        />
                                    ) : (
                                        vehicle.brand
                                    )}
                                    </td>                      
                                    
                                    <td className={`px-6 py-4`}>
                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                        <input
                                        className="text-center w-full py-1 rounded-lg bg-transparent"
                                        min={0}
                                        type="number"
                                        defaultValue={vehicle.places}
                                        {...register("Places")}
                                        />
                                    ) : (
                                        vehicle.places
                                    )}
                                    </td>
                                    
                                    <td className={`px-6 py-4`}>
                                        <label className="relative top-1 inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer"
                                                disabled={updateMode.Mode && updateMode.fieldId === vehicle.id ? false : true}
                                                defaultChecked={vehicle.lux}
                                                {...register("Luxury")}
                                            />
                                            <div
                                                className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </td>
                                    <td className={`px-6 py-4`}>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                className={`font-bold ${updateMode.Mode && updateMode.fieldId === vehicle.id ? "hover:text-red-500" : "hover:text-amber-500"}`}
                                                type="button"
                                                onClick={()=>{
                                                    updateMode.Mode && updateMode.fieldId === vehicle.id ?
                                                    dispatch(disableVehicleModifyMode())
                                                    :
                                                    (dispatch(enableVehicleModifyMode(vehicle.id)) && dispatch(disableVehicleCreateMode()))
                                                }}
                                            >
                                                {updateMode.Mode && updateMode.fieldId === vehicle.id ? "Close" :"Update"}
                                            </button>
                                            <button
                                                className={`font-bold ${updateMode.Mode && updateMode.fieldId === vehicle.id ? "hover:text-emerald-500" : "hover:text-red-500"}`}
                                                type={ updateMode.Mode && updateMode.fieldId === vehicle.id ? "submit":"button"}
                                                onClick={() => {
                                                    !updateMode.Mode && deleteVehicle(vehicle.id)
                                                }} 
                                            >
                                                {updateMode.Mode && updateMode.fieldId === vehicle.id ? "Submit" :"Delete"}
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
                        <VehiclesForm register={register} errors={errors} setValue={setValue} setToast={SetToast} disableVehicleCreateMode={disableVehicleCreateMode}/>
                    }
                    </tbody>
                </table>
            </form>
        </div>
    )
        ;
};

export default Vehicules;
