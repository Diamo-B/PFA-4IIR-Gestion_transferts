import { UilPlus } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { enableModelCreateMode, disableModelCreateMode } from "../../../../Redux/Transportation";
import Item from "./Item";

const Models = () => {
  let dispatch = useDispatch();
  let  {models,createMode}  = useSelector(state => state.transportation.models)
  return (
    <div className="bg-indigo-50 rounded-2xl shadow-lg py-5 px-2 text-gray-700 flex flex-col gap-5 overflow-y-auto">
        <div className="flex relative group hover:cursor-pointer"  onClick={()=>dispatch(enableModelCreateMode())}>
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
          <Item Text={"----"} isCreate={true} disableCreateMode={disableModelCreateMode}/>
        }
    </div>
  );
};

export default Models;
