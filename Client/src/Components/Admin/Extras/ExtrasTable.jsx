import useExtrasManipulation from "./Hooks/useExtrasManipulation";
import { UilExternalLinkAlt } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { openPanel } from "../../../Redux/confirmationPanel";
import { disableUpdateMode, enableUpdateMode, openParamsPanel } from "../../../Redux/extras";
import CreateForm from "./CreateForm";
import { useEffect } from "react";


const ExtrasTable = () => {
  let dispatch = useDispatch();
  let { selectedType, extrasToShow, paramsPanel, selectedExtras, createMode, updateMode } = useSelector((state) => state.extras);
  let { toggleExtraStatus, selectOrDeselectAll, selectOrDeselectExtra } = useExtrasManipulation();
  
  useEffect(() => {
    console.log(selectedExtras);
  }, [selectedExtras])

  return (
    <>
    <div className="relative w-full flex-1 h-full overflow-y-auto rounded-xl ">
      <div className="rounded-xl">
        <table className="w-full text-gray-500 text-center rounded-xl">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={extrasToShow.length == 0}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    onChange={selectOrDeselectAll}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-5">
                Label
              </th>
              <th scope="col" className="px-6 py-5">
                Params
              </th>
              <th scope="col" className="px-6 py-5">
                Price
              </th>
              <th scope="col" className="px-6 py-5">
                Status
              </th>
              <th scope="col" className="px-6 py-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {selectedType && extrasToShow.length > 0 && (
              extrasToShow.map((extra) => (
                <tr
                  className="bg-white hover:bg-gray-50 font-medium text-gray-900 capitalize"
                  key={extra.id}
                >
                  <th className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={selectedExtras.includes(extra.id)}
                        onChange={(e)=>selectOrDeselectExtra(e,extra.id)}
                      />
                    </div>
                  </th>
                  {
                    paramsPanel !== extra.id ?
                    <>
                      <td scope="row" className="px-6 py-5">
                        {
                          updateMode.value && updateMode.id === extra.id ?
                            <input type="text" value={extra.label} className="w-full"/>
                          :
                            extra.label
                        }
                      </td>
                      <td className="px-6 py-5">
                        {extra.params && extra.params !== "{}" ? (
                          <button
                            onClick={() => {
                              dispatch(openParamsPanel(extra.id));
                            }}
                          >
                            <UilExternalLinkAlt />
                          </button>
                        ) : (
                          "-----"
                        )}
                      </td>
                      <td className="px-6 py-5">{extra.price} MAD</td>
                      <td className={`px-6 py-4`}>
                        <div className="flex items-center gap-2 justify-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              extra.active ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          ></div>
                          <p>{extra.active ? "active" : "Inactive"}</p>
                        </div>
                      </td>
                    </>
                    :
                      <td colSpan={4} className="px-6 py-5 relative">
                        <input type="text" value={extra.params} readOnly={true} className="input w-3/4 hover:disabled:cursor-not-allowed"/>
                      </td>
                  }
                  
                  
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      {
                        paramsPanel !== extra.id ?
                          <button
                            className={`font-bold ${
                              extra.active
                                ? "hover:text-red-500"
                                : "hover:text-emerald-500"
                            }`}
                            onClick={()=>toggleExtraStatus(extra.id, extra.active)}
                          >
                            {extra.active ? "Disable" : "Activate"}
                          </button>
                        :
                          <button
                            className={`font-bold hover:text-amber-500`}
                            onClick={()=>dispatch(openParamsPanel(null))}
                          >
                            Close
                          </button>
                      }

                      {
                        updateMode.value == false && updateMode.id !== extra.id ?
                          <button className="font-bold hover:text-amber-500"
                            onClick={()=>dispatch(enableUpdateMode(extra.id))}
                          >
                            Update
                          </button>
                        :
                        (
                          updateMode.value === true && updateMode.id === extra.id &&
                          <button className="font-bold hover:text-red-500"
                            onClick={()=>dispatch(disableUpdateMode())}
                          >
                            Cancel
                          </button>
                        )
                        
                      }

                      <button className="font-bold hover:text-red-500"
                        onClick={()=>{
                          dispatch(openPanel({
                            operation_type: "Delete an extra",
                            Impact: "danger",
                            executeParams: extra.id
                          }))
                        }}
                      >
                        Delete
                      </button>


                    </div>
                  </td>
                </tr>
              ))
            ) 
            }

            {
              (  extrasToShow.length == 0 && !createMode) &&
              <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
                <th colSpan={6} className="p-5">
                  <p>
                    {selectedType === null
                      ? "please select an extra type above"
                      : `no extras were found for the type ${selectedType}`}
                  </p>
                </th>
              </tr>
            }
            
          </tbody>
        </table>
      </div>
    </div>
    {createMode && <CreateForm />}
    </>
  );
};

export default ExtrasTable;
