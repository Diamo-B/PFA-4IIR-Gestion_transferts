import CreateForm from "./CreateForm";
import ErrorsPanel from "./ErrorsPanel";

import { UilExternalLinkAlt, UilEdit  } from "@iconscout/react-unicons";

import useExtrasManipulation from "./Hooks/useExtrasManipulation";
import useOnMountTableEffects from "./Hooks/useOnMountTableEffects";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import { openPanel } from "../../../Redux/Gen/confirmationPanel";
import { closeParamsPanel, disableUpdateMode, enableUpdateMode, openParamsPanel, triggerFormErrors } from "../../../Redux/Admin/extras";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {updateSchema} from "./YupSchemas";

const ExtrasTable = () => {
  let dispatch = useDispatch();
  let { selectedType, extrasToShow, paramsPanel, selectedExtras, createMode, updateMode, formErrors } = useSelector((state) => state.extras);

  let { updateExtra, toggleExtraStatus, selectOrDeselectAll, selectOrDeselectExtra } = useExtrasManipulation();
  let generalCheckbox = useRef(null);

  useOnMountTableEffects(generalCheckbox);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    Object.keys(errors).length > 0 && dispatch(triggerFormErrors())
  }, [errors]);

  useEffect(() => {
    if (updateMode.value && updateMode.extra) {
      setValue("label", updateMode.extra.label);
      setValue("price", updateMode.extra.price);
      setValue("params", updateMode.extra.params);
    }
  }, [updateMode]);

  const update = (data) => {
    updateExtra(data, updateMode.extra.id);
  }

  return (
    <>
    <div className="relative w-full flex-1 h-full overflow-y-auto rounded-xl ">
      <form className="rounded-xl" 
        onSubmit={handleSubmit(update)}
      >
        <table className="w-full text-gray-500 text-center rounded-xl">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={extrasToShow.length == 0}
                    ref={generalCheckbox}
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
                    paramsPanel.id !== extra.id ?
                    <>
                      <td scope="row" className="px-6 py-5">
                        {
                          updateMode.value && updateMode.extra?.id === extra.id ?
                            <input type="text" autoFocus={true} className={`text-center w-full py-1 rounded-lg bg-transparent ${errors.label && "border-red-500"}`}
                              onChange={(e) => {setValue("label", e.target.value)}}
                              {...register("label")}
                            />
                          :
                            extra.label
                        }
                      </td>

                      <td className="px-6 py-5">
                        {
                          updateMode.value && updateMode.extra?.id === extra.id ?
                          (
                            <button
                              onClick={() => {
                                dispatch(openParamsPanel(extra.id));
                              }}
                            >
                              <UilEdit  />
                            </button>
                          )
                          :
                          (
                            extra.params && extra.params !== "{}" ?
                              <button
                                onClick={() => {
                                  dispatch(openParamsPanel(extra.id));
                                }}
                              >
                                <UilExternalLinkAlt />
                              </button>
                            :
                              "-----"
                          )
                        }
                      </td>
                      
                      <td className="px-6 py-5">
                        {
                          updateMode.value && updateMode.extra?.id === extra.id ?
                            <input type="text" className="text-center w-full py-1 rounded-lg bg-transparent"
                              onChange={(e) => {setValue("price", e.target.value)}}
                              {...register("price")}
                            />
                          :
                            (extra.price+" MAD")
                        }
                      </td>
                      
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
                      <td colSpan={4} className="px-6 py-5">
                        {
                          updateMode.value === true && updateMode.extra?.id === extra.id?
                          <input type="text"   className="input w-3/4"
                            onChange={(e) => {setValue("params", e.target.value)}}
                            {...register("params")}
                          />
                          :
                          <input type="text" value={extra.params} readOnly={true} className="input w-3/4 hover:read-only:cursor-not-allowed"/>
                        }
                      </td>
                  }
                  
                  
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      {
                        updateMode.extra?.id !== extra.id &&
                        (
                          paramsPanel.id !== extra.id ?
                            <button
                              className={`font-bold ${
                                extra.active
                                  ? "hover:text-red-500"
                                  : "hover:text-emerald-500"
                              }`}
                              onClick={()=>toggleExtraStatus(extra.id, extra.active)}
                              type="button"
                            >
                              {extra.active ? "Disable" : "Activate"}
                            </button>
                          :
                            <button
                              className={`font-bold hover:text-red-500`}
                              onClick={()=>dispatch(closeParamsPanel())}
                              type="button"
                            >
                              Close
                            </button>
                        )
                      }

                      {
                        updateMode.extra?.id !== extra.id ?
                          <button className="font-bold hover:text-amber-500"
                            onClick={()=>dispatch(enableUpdateMode(extra))}
                            type="button"
                          >
                            Update
                          </button>
                        :
                        (
                          updateMode.value === true && updateMode.extra?.id === extra.id &&
                          (
                            paramsPanel.id == extra.id ?
                            <button className="font-bold hover:text-red-500"
                              onClick={()=>dispatch(closeParamsPanel())}
                              type="button"
                            >
                              Close
                            </button>
                            :
                            <button className="font-bold hover:text-red-500"
                              onClick={()=>dispatch(disableUpdateMode())}
                              type="button"
                            >
                              Cancel
                            </button>
                          )
                        )
                        
                      }

                      {
                        updateMode.value === true && updateMode.extra?.id === extra.id ?
                          (
                            !paramsPanel.state &&
                            <button className="font-bold hover:text-emerald-500"
                              type="submit"
                            >
                              Submit
                            </button>
                          )
                        :
                          <button className="font-bold hover:text-red-500"
                            onClick={()=>{
                              dispatch(openPanel({
                                operation_type: "Delete an extra",
                                Impact: "danger",
                                executeParams: extra.id
                              }))
                            }}
                            type="button"
                          >
                            Delete
                          </button>
                      }
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
      </form>
      {
        formErrors &&
        <ErrorsPanel errors={errors}/>
      }
    </div>
    {createMode && <CreateForm />}
    </>
  );
};

export default ExtrasTable;
