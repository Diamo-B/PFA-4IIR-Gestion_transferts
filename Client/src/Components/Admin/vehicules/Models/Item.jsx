import { UilTrashAlt, UilEdit, UilMessage} from "@iconscout/react-unicons";
import { useEffect, useState } from "react";

const Item = ({Text}) => {
    let [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        console.log(editMode);
    },[editMode])

    let ModifyModel = () => {
        //TODO: update the model in the db
        setEditMode(false);
    }

    let deleteModel = () => {
        //TODO: remove the model from the db
    }

    return ( 
        <div className="flex relative group hover:cursor-pointer">
            {
                !editMode ?
                <>
                    <div className="w-full text-base font-bold border-2 border-gray-700 py-2 rounded-full text-center">
                        {Text}
                    </div>
                    <div className="absolute h-full w-full hidden group-hover:flex">
                        <button className="flex justify-center items-center border-gray-700 bg-red-500 rounded-l-full w-1/2 hover:bg-red-400"
                            onClick={deleteModel}
                        >
                            <UilTrashAlt className="text-bold group-hover:text-white" />
                        </button>
                        <button className="flex justify-center items-center border-gray-700 bg-amber-500 rounded-r-full w-1/2 hover:bg-amber-400"
                            onClick={()=>setEditMode(true)}
                        >
                            <UilEdit className="text-bold group-hover:text-white" />
                        </button>
                    </div>
                </>
                :
                <div className="flex relative w-full">
                    <input 
                        className="w-full text-base font-bold border-2 border-gray-700 py-2 rounded-full text-center"
                        type="text"
                        defaultValue={Text}
                    />
                    <button className="border-2 border-gray-700 rounded-full absolute right-0 h-full items-center px-5 flex hover:bg-emerald-400 group"
                        onClick={ModifyModel}
                    >
                        <UilMessage className="text-bold group-hover:text-white" />
                    </button>
                </div>  
            }
            
        </div>
    );
}
 
export default Item;