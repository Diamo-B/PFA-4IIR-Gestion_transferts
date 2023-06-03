import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetToast } from "../../../../Redux/toast";
import {
  activateLoading,
  disableLoading,
  setVehicules,
} from "../../../../Redux/Transportation";

import ModelChooser from "./modelChooser";
import TopBar from "./TopBar";

const Vehicules = () => {
  let dispatch = useDispatch();
  let { vehicules } = useSelector((state) => state.transportation.models);
  let { selectedModel, isLoading } = useSelector(
    (state) => state.transportation.vehicules
  );

  useEffect(()=>{
    dispatch(activateLoading())
    if(selectedModel)
    {
      fetch(`/api/vehicule/getByModel/${selectedModel}`,{
        method:"get",
        headers:{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${localStorage.getItem("jwt")}`
        }
      }).then(async(res)=>{
        let response = await res.json();
        console.log(response);
        dispatch(setVehicules(response));
      }).catch(async(err)=>{
        let error = await err.json();
        if(error.err)
        {
          dispatch(SetToast({
            type: "Error",
            message: error.err,
            reload: false
          }))  
        }
        else
          console.error(error);
      })
    }
    dispatch(disableLoading())
  },[selectedModel])

  useEffect(()=>{
    console.log(vehicules);
  },[vehicules])
  if (isLoading) {
    return <div className="text-gray-700 font-bold">Loading ...</div>;
  }

  return (
    <div className="max-h-full overflow-auto col-span-3 bg-indigo-50 rounded-2xl drop-shadow-lg p-5 flex flex-col gap-5">
      <ModelChooser />

      <TopBar />

      <div className="max-h-full text-base  overflow-y-auto rounded-xl">
        <table className="w-full text-gray-500 relative text-center">
          <thead className=" text-gray-700 uppercase bg-gray-50 sticky top-0">
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
          <tbody>
          {
            vehicules?.length > 0 &&
            vehicules.map((vehicule) => (
              <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
              <th className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                </div>
              </th>
              <th scope="row" className="px-6 py-4">
                {vehicule.sub_Brand}
              </th>
              <td className="px-6 py-4">{vehicule.brand}</td>
              <td className="px-6 py-4">{vehicule.places}</td>
              <td className="px-6 py-4">
                <label className="relative top-1 inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" 
                    disabled={true}
                    checked={vehicule.lux}
                  />
                  <div className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    className="font-bold hover:text-amber-500"
                  >
                    Update
                  </button>
                  <button
                    className="font-bold hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicules;
