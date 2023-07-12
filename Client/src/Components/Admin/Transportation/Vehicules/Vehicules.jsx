import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {useForm, Controller, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import ModelChooser from "./ModelChooser";
import TopBar from "./TopBar";
import VehiclesForm from "./VehiclesForm";
import ConfirmOp from "../../../ConfirmOperation/ConfirmOp";
import CustomCheckBox from './vehiclesComponents/CustomCheckBox.jsx'

import {setToast} from "../../../../Redux/Gen/toast";
import {
    setVehicles,
    resetVehicles,
    disableVehicleCreateMode, 
    enableVehicleModifyMode, 
    disableVehicleModifyMode,
    showImagesViewingPanel,
    showImagesUpdatingPanel
} from "../../../../Redux/Admin/Transportation";

import {
    openPanel
} from "../../../../Redux/Gen/confirmationPanel";

import {
    createSchema,
    updateSchema
} from "./vehiclesComponents/yupSchemas";

import { isLoading, doneLoading } from "../../../../Redux/Gen/Loading";

import useVehiclesFunctions from "./hooks/useVehiclesFunctions";

import { UilImages, UilImageEdit } from '@iconscout/react-unicons'
import FileUploader from "./vehiclesComponents/FileUploader"
import useOnMountEffects from "./hooks/useOnMountEffects";
import FileViewer from "./vehiclesComponents/FileViewer";

const Vehicules = () => {
    let dispatch = useDispatch();
    
    let {
        vehicles,
        selectedModel, 
        selectedVehicles, 
        createMode, 
        updateMode,
        imagesPanels
    } = useSelector((state) => state.transportation.vehicules);

    let {confirmOp} = useSelector(state => state.confirmationPanel); 
    
    const generalCheckbox = useRef();
    
    let {deleteSelectedVehicles, createVehicle, UpdateVehicle, changeStatus, deleteVehicle, addOrRemoveSelection, addOrRemoveAll} = useVehiclesFunctions();

    const methods = useForm({resolver: yupResolver(createMode === true ? createSchema : updateSchema)});

    let [deleteLots, setDeleteLots] = useState(false);
    
    const { errors } = methods.formState;
    useOnMountEffects({errors});

    return (
        
        <div
            className="max-h-full overflow-auto col-span-3 bg-indigo-50 rounded-2xl drop-shadow-lg p-5 flex flex-col gap-5 font-normal">
            <ModelChooser/>

            <TopBar resetFields={methods.reset} generalCheckbox={generalCheckbox} setDeleteLots={setDeleteLots}/>
            <FormProvider {...methods}>
                <form className="max-h-full  overflow-y-auto rounded-xl"
                    onSubmit={updateMode.Mode == true ? methods.handleSubmit(UpdateVehicle) : methods.handleSubmit(createVehicle)}
                >
                    <table className="w-full relative text-center">
                        <thead className=" text-xs text-gray-600 uppercase bg-gray-50 sticky top-0 z-30">
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
                            {
                                !updateMode.Mode && !createMode &&
                                <th className="px-6 py-3">
                                    Status
                                </th>
                            }
                            <th scope="col" className="px-6 py-3">
                                luxe
                            </th>
                            <th scope="col" className="px-7 py-3">
                                {!updateMode.Mode ? <UilImages /> : <UilImageEdit />}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody className="text-sm">
                        {
                            !selectedModel
                                &&
                                <tr className="text-gray-900 capitalize font-medium bg-white hover:bg-gray-50">
                                    <td colSpan="8" className="py-8 text-center">
                                        <p className="font-bold">Please select a model</p>
                                    </td>
                                </tr>
                        }
                        {
                            selectedModel && vehicles.length === 0 && createMode == false?
                                <tr className="text-gray-900 capitalize font-medium bg-white hover:bg-gray-50">
                                    <td colSpan="7" className="py-8 text-center">
                                        <p>No vehicles were found</p>
                                    </td>
                                </tr>
                            :
                                vehicles.map((vehicle) => (
                                    <tr className={`text-gray-900 capitalize font-medium ${updateMode.Mode && updateMode.fieldId === vehicle.id ? "bg-slate-100" : "bg-white hover:bg-gray-50"}`}
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
                                        
                                        <td scope="row" className={`px-6 py-4`}>
                                        {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                            <input
                                            className="text-center w-full py-1 rounded-lg bg-transparent"
                                            autoFocus={true}
                                            type="text"
                                            defaultValue={vehicle.sub_Brand}
                                            {...methods.register("Model")}
                                            />
                                        ) : (
                                            vehicle.sub_Brand
                                        )}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                        {updateMode.Mode && updateMode.fieldId === vehicle.id ? (
                                            <input
                                            className="text-center w-full py-1 rounded-lg bg-transparent"
                                            type="text"
                                            defaultValue={vehicle.brand}
                                            {...methods.register("Brand")}
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
                                            {...methods.register("Places")}
                                            />
                                        ) : (
                                            vehicle.places
                                        )}
                                        </td>
                                        {
                                            !updateMode.Mode && !createMode &&
                                            <td className={`px-6 py-4`}>
                                                <div className="flex items-center gap-2 justify-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full ${vehicle.Status ? "bg-emerald-500" : "bg-red-500"}`}></div>
                                                    <p>{vehicle.Status?"Active":"Inactive"}</p>
                                                </div>
                                            </td>
                                        }
                                        <td className={`px-6 py-4`}>
                                            <label className="relative top-1 inline-flex items-center cursor-pointer">
                                                <Controller
                                                name="Luxury"
                                                control={methods.control}
                                                render={({ field }) => (
                                                    <CustomCheckBox
                                                    disabled={updateMode.Mode && updateMode.fieldId === vehicle.id ? false : true}
                                                    defaultValue={vehicle.lux}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    />
                                                )}
                                                />
                                                <div
                                                    className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </label>
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <div className="flex justify-center gap-3">
                                                {
                                                    <button className={`font-bold ${updateMode.Mode && updateMode.fieldId === vehicle.id ? "hover:text-amber-400" : "hover:text-emerald-400"}`} type="button"
                                                        onClick={() => {
                                                            updateMode.Mode == true && updateMode.fieldId === vehicle.id ?
                                                            dispatch(showImagesUpdatingPanel(vehicle))
                                                            :
                                                            dispatch(disableVehicleModifyMode()) && dispatch(showImagesViewingPanel(vehicle))
                                                        }}
                                                    >
                                                        {updateMode.Mode == true && updateMode.fieldId === vehicle.id ? "Update" :"View"}
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <div className="flex justify-center gap-3">
                                                {
                                                    !updateMode.Mode && !createMode &&
                                                    <button className={`font-bold ${vehicle.Status? "hover:text-purple-600" : "hover:text-emerald-500"}`} type="button"
                                                        onClick={()=>changeStatus(vehicle.id,vehicle.Status)}
                                                    >
                                                        {vehicle.Status? "Disable" : "Enable"}
                                                    </button>
                                                }
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
                                                        !updateMode.Mode && 
                                                        dispatch(
                                                            openPanel({
                                                                Impact:"danger",
                                                                operation_type:"Delete Vehicle",
                                                                executeParams:vehicle.id
                                                            })
                                                        )
                                                    }} 
                                                >
                                                    {updateMode.Mode && updateMode.fieldId === vehicle.id ? "Submit" :"Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        }
                        {
                            (createMode === true && selectedModel !== null) &&
                            <VehiclesForm />
                        }
                        </tbody>
                    </table>
                </form>
                
                {
                    createMode && imagesPanels.create.state &&
                    <FileUploader />
                }

                {
                    !createMode  && (imagesPanels.view.state || imagesPanels.update.state)
                    &&
                    <FileViewer />
                }
            </FormProvider>
            {
                confirmOp.value
                &&
                <ConfirmOp Impact={confirmOp.Impact} operation_type={confirmOp.operation_type} execute={!deleteLots ? deleteVehicle: deleteSelectedVehicles}/>
            }
        </div>
    )
};

export default Vehicules;
