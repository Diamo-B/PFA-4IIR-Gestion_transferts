import { UilTrashAlt, UilEdit, UilMessage, UilMultiply } from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetToast } from "../../../../Redux/toast";
import {useForm} from "react-hook-form";
import { activateRefetch } from "../../../../Redux/Transportation";

const Item = ({Text,isCreate,disableCreateMode,ID}) => {
    let dispatch = useDispatch();
    let [editMode, setEditMode] = useState(false);

    let saveNewModel = (data) => {
        //TODO: create a model in the db
        fetch("/api/models/create",{
            method: "post",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                name: data.value
            })
        }).then(async (res)=>{
            let response = await res.json();
            dispatch(activateRefetch())
            dispatch(
                SetToast({
                    type: "Success",
                    message: "The model "+response.label+" was created successfully!",
                    reload: false
                })
            )
        }).catch(async err => {
            let error = await err.json();
            if(error.err)
            {
                dispatch(
                    SetToast({
                        type: "Error",
                        message: error.err,
                        reload: false
                    })
                )
            }
            else
            {
                console.error(error);
                dispatch(
                    SetToast({
                        type: "Error",
                        message: "An Unknown error has occured while ",
                        reload: false
                    })
                )
            }
        })
        dispatch(disableCreateMode());
    }

    let ModifyModel = (data) => {
        //TODO: update the model in the db
        console.log(data);
        fetch("/api/models/update",{
            method:"put",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                id: ID,
                newName: data.value
            })
        }).then(async(res)=>{
            let response = await res.json();
            dispatch(activateRefetch())
            dispatch(SetToast({
                type: "Success",
                message: "the model was updated successfully!",
                reload: false
            }))
        }).catch(async(err)=>{
            let error= await err.json();
            if(error.err)
            {
                dispatch(SetToast({
                    type: "Error",
                    message: error.err,
                    reload: false
                }))   
            }
        })
        setEditMode(false);
    }

    let deleteModel = () => {
        //TODO: remove the model from the db
        fetch("/api/models/remove",{
            method:'delete',
            headers:{
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                id: ID
            })
        }).then(async(res) => {
            let response = await res.json();
            dispatch(activateRefetch())
            dispatch(SetToast({
                type:"Success",
                message: "The model "+response.label+" was deleted successfully!!",
                reload: false
            }))
        }).catch(async (err)=>{
            let error = await err.json();
            if(error.err)
                dispatch(SetToast({
                    type:"Error",
                    message: error.err,
                    reload: false
                }))
            else
                dispatch(SetToast({
                    type:"Error",
                    message: "An Unknown error has occured during the deletion",
                    reload: false
                }))
            console.error(error);
        })
    }

    let blurInput = () => {
        if(editMode === true) 
            setEditMode(false)
        else
            dispatch(disableCreateMode())
    }
    
    const {register, handleSubmit, formState:{errors}} = useForm({});
    
    let onSubmit = (data) => {
        isCreate ? saveNewModel(data) : ModifyModel(data);
    }

    return ( 
        <>
            {
                !editMode && !isCreate ?
                <div className="group w-full relative">
                    <div className="w-full text-base font-bold border-2 border-gray-700 py-2 rounded-full text-center">
                        {Text}
                    </div>
                    <div className="absolute top-0 h-full w-full hidden group-hover:flex">
                        <button className="flex justify-center items-center border-gray-700 bg-red-500 rounded-l-full w-1/2 hover:bg-red-400"
                            onClick={()=>deleteModel()}
                        >
                            <UilTrashAlt className="text-bold group-hover:text-white" />
                        </button>
                        <button className="flex justify-center items-center border-gray-700 bg-amber-500 rounded-r-full w-1/2 hover:bg-amber-400"
                            onClick={()=>setEditMode(true)}
                        >
                            <UilEdit className="text-bold group-hover:text-white" />
                        </button>
                    </div>
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                    <form className="flex relative w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            className="w-full text-base font-bold border-2 border-gray-700 py-2 rounded-full text-center"
                            type="text"
                            defaultValue={isCreate ? "" :Text}
                            placeholder={isCreate && "New Model ..."}
                            autoFocus={true}
                            {...register('value',{required: "The model's name is required"})}
                        />
                        <button className="group border-2 border-gray-700 rounded-full absolute right-0 h-full items-center px-5 flex hover:bg-emerald-400"
                            type="submit"
                        >
                            <UilMessage className="group-hover:text-white" />
                        </button>
                        <button className="group border-2 border-gray-700 rounded-full absolute left-0 h-full items-center px-5 flex hover:bg-red-400"
                            type="button"
                            onClick={blurInput}
                        >
                            <UilMultiply className="group-hover:text-white" />
                        </button>
                    </form>
                    <small className="text-red-500 font-bold">
                        {errors.value?.message}
                    </small>
                </div>
            }
            
        </>
    );
}
 
export default Item;