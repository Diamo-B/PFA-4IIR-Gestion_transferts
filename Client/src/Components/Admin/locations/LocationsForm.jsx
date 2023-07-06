import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLocation, closeWindow, triggerRefetch, updateLocation } from "../../../Redux/Admin/locations"
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../Redux/Gen/toast";
import { useEffect, useState } from "react";

const LocationsForm = ({windowType}) => {

    let disptach = useDispatch();
    let {locations, locationToUpdate} = useSelector(state => state.mapPanel.locations);
    //! locationToUpdate Coming from the update btn in the locations table and has the ID of the location to update
    const locationCreationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Please provide the Locations's name"),
        longitude: yup
            .number()
            .nullable()
            .notRequired()
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : (typeof originalValue === "string" ? parseFloat(originalValue) : value)
            ),
        latitude: yup
            .number()
            .nullable()
            .notRequired() 
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : (typeof originalValue === "string" ? parseFloat(originalValue) : value)
            ),
    });

    const locationUpdateSchema = yup.object().shape({
        name: yup
            .string()
            .nullable()
            .notRequired()
            .transform((value, originalValue) => {
                if (typeof value === 'string' && value.trim() === '') {
                  return undefined;
                }
                return value;
            }),              
        longitude: yup
            .number()
            .nullable()
            .notRequired()
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : (typeof originalValue === "string" ? parseFloat(originalValue) : value)
            ),
        latitude: yup
            .number()
            .nullable()
            .notRequired() 
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : (typeof originalValue === "string" ? parseFloat(originalValue) : value)
            ),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(windowType == "create" ? locationCreationSchema : locationUpdateSchema),
    });
    
    const onLocationSubmit = (data) => {
        if(windowType == "create")
        {
            fetch("/api/place/create",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify(data)
            }).then(async(res)=>{
                let New_location = await res.json();
                if(New_location.err)
                    disptach(setToast({type: "Error", message: New_location.err, reload: false}))
                else
                {
                    disptach(addLocation(New_location));
                    disptach(closeWindow());
                    disptach(setToast({type: "Success", message: "New Location Created Successfully!", reload: false}))
                }
            }).catch((error)=>{
                console.error(error);
                disptach(setToast({type: "Error", message: "Unknown Error! Contact the admins!!", reload: false}))
            }) 
        }
        else if (windowType == "update")
        {
            fetch("/api/place/update",{
                method: "put",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
                body:JSON.stringify({
                    id:locationToUpdate,
                    name: data.name, 
                    longitude: data.longitude, 
                    latitude: data.latitude
                })
            })
            .then(async (res) => {
                let result = await res.json();
                disptach(updateLocation(result));
                disptach(closeWindow());
                disptach(setToast({type: "Info", message: "Location Updated Successfully!", reload: false}))
            })
            .catch(err=>{
                console.error(err);
                disptach(setToast({type: "Error", message: "Unknown Error! Contact the admins!!", reload: false}))
            })
        }
    };
    
    let [locationObj, setLocationObj] = useState(); //! Contains the location to update
    useEffect(()=>{
        if(windowType == "update")
        {
            fetch("/api/place/get/"+locationToUpdate,{
                method: "get",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then(async(res)=>{
                let result = await res.json();
                setLocationObj(result);
            }).catch(err=>{
                console.error(err);
                disptach(setToast({type: "Error", message: "Unknown Error! Contact the admins!!", reload: false}))
            })
        }
    },[])

    return (
        <form
            className="flex flex-col justify-center gap-5 w-4/6"
            onSubmit={handleSubmit(onLocationSubmit)}
        >
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    autoFocus={true}
                    placeholder={windowType == "create" ? "Location's Name" : locationObj && locationObj.name ? locationObj.name : ""}
                    className="input font-bold"
                    {...register("name")}
                />
                <small className="text-red-600 font-medium">
                    {errors.name?.message}
                </small>
            </div>
            <div className="flex justify-center gap-5">
                <div className="flex flex-col items-center">
                    <input
                        type="number"
                        step="any"
                        placeholder={windowType == "create" ? "Longitude" : locationObj && locationObj.longitude ? locationObj.longitude : "-------"}
                        className="input font-bold"
                        {...register("longitude")}
                    />
                    <small className="text-red-600 font-medium">
                        {errors.longitude?.message}
                    </small>
                </div>
                <div className="flex flex-col items-center">
                    <input
                        type="number"
                        step="any"
                        placeholder={windowType == "create" ? "Latitude" : locationObj && locationObj.latitude ? locationObj.latitude : "-------"}
                        className="input font-bold"
                        {...register("latitude")}
                    />
                    <small className="text-red-600 font-medium">
                        {errors.latitude?.message}
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
