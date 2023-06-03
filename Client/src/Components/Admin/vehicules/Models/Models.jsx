import { UilPlus } from "@iconscout/react-unicons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetToast } from "../../../../Redux/toast";
import { enableCreateMode, disableCreateMode, setModels, disableRefetch } from "../../../../Redux/Vehicules";
import Item from "./Item";

const Models = () => {
  let dispatch = useDispatch();
  let  {createMode,refetch, models}  = useSelector(state => state.transportation.models)
  
  //TODO: fetch the models
  useEffect(()=>{
    fetch("/api/models/getAll",{
      method: "get",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(async(res) => {
      let response = await res.json();
      if(response.err)
        dispatch(SetToast({
          type: "Error",
          message: response.err,
          refetch: false
        }))
      else
      {
        dispatch(setModels(response));
      }
    }).catch(async (err) => {
      console.error(err);
      dispatch(SetToast({
        type: "Error",
        message: "An unknown error occured while fetching the models!!",
        refetch: false
      }))
    })

    dispatch(disableRefetch())
  },[refetch])

  return (
    <div className="bg-indigo-50 rounded-2xl shadow-lg py-5 px-2 text-gray-700 flex flex-col gap-5 overflow-y-auto">
        <div className="flex relative group hover:cursor-pointer"  onClick={()=>dispatch(enableCreateMode())}>
            <button className="w-full text-base font-bold border-2 border-emerald-500 py-2 rounded-full text-center group-hover:bg-emerald-500 group-hover:text-white"
            >
              Add New Model
            </button>
            <div className="border-2 border-emerald-500 rounded-full absolute right-0 h-full items-center px-5 hidden group-hover:flex group-hover:bg-white">
              <UilPlus className="text-bold group-hover:text-emerald-500" />
            </div>
        </div>
        {
          models &&
          models.map(model=>(
            <div key={model.id}>
              <Item Text={model.label} ID={model.id} />
            </div>
          ))
        }
        {
          createMode &&
          <Item Text={"----"} isCreate={true} disableCreateMode={disableCreateMode}/>
        }
    </div>
  );
};

export default Models;
