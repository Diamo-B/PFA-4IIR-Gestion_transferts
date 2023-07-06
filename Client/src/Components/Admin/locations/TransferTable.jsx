import TableCard from "../../../Components/Admin/locations/TableCard";
import {
  setWindowType,
  openWindow,
  setPaths,
  resetSelection,
  setPathToUpdate,
  updatePath,
  deletePath,
  deletePaths,
} from "../../../Redux/Admin/locations";
import useLocationHelpers from "./useLocationHelpers";
import { useSelector, useDispatch } from "react-redux";
import TransferForm from "./TransferForm";
import { useEffect } from "react";
import { setToast } from "../../../Redux/Gen/toast";
import { closePanel, openPanel } from "../../../Redux/Gen/confirmationPanel";
import ConfirmOp from "../../ConfirmOperation/ConfirmOp";

const TransferTable = () => {
  let dispatcher = useDispatch();
  let { triggerWindow, triggerType, windowType, Refetch, selected } = useSelector(
    (state) => state.mapPanel.window
  );
  let { paths } = useSelector((state) => state.mapPanel.paths);

  const { selectOrDeselectAllPaths, selectOrDeselect } = useLocationHelpers();

  const {confirmOp} = useSelector(state => state.confirmationPanel)

  useEffect(() => {
    dispatcher(closePanel());
  }, []);

  useEffect(() => {
    fetch("/api/path/getAll", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(async (res) => {
        let results = await res.json();
        if(!results.err)
          dispatcher(setPaths(results));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let changeStatus = (id, newStatus) => {
    fetch("/api/path/update", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        id: id,
        newData: {
          active: newStatus,
        },
      }),
    })
      .then(async (res) => {
        let result = await res.json();
        let message = newStatus === true ? "activated" : "disabled";
        dispatcher(updatePath(result));
        dispatcher(
          setToast({
            type: "Info",
            message: `Path was ${message} successfully!!`,
            reload: false,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let DeleteSinglePath = (id) => {
    fetch("/api/path/remove", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(async (res) => {
        let result = await res.json();
        dispatcher(deletePath(result.id));
        dispatcher(
          setToast({
            type: "Success",
            message: `The path linking between ${result.departure.name} and ${result.arrival.name} was deleted successfully!`,
            reload: false,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        dispatcher(
          setToast({
            type: "Error",
            message: `An Unknown error occured. If it persists, contact a SuperAdmin`,
            reload: false,
          })
        );
      });
  };

  let deleteSelectedPaths = () => {
    fetch("/api/path/removeMany",{
      method: "delete",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body:JSON.stringify({
        ids: selected
      })
    }).then(async (res) => {
      let response = await res.json();
      if(response.err)
      {  dispatcher(setToast({
          type:"Error",
          message:response.err,
          reload: false
        }))
      }
      else
      {
        dispatcher(setToast({
          type: "Success",
          message:response.msg,
          reload: false
        }))
        dispatcher(deletePaths(selected))
      }
      
    }).catch((err)=>{
      console.error(err);
      dispatcher(setToast({
        type: "Error",
        message:"An unknown error occured",
        reload: false
      }))
    })
  }
  
  return (
    <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
      <div className="w-full h-full mt-5 px-5">
        <div className="mb-5 flex gap-5 justify-center text-center">
          <button
            className="btn px-5 hover:bg-emerald-500 hover:text-white"
            onClick={() => {
                dispatcher(setWindowType("create"));
                dispatcher(resetSelection());
                dispatcher(openWindow());
            }}
          >
            Create A New Transfer Path
          </button>
          {
            selected.length > 0
            &&
            <button className="btn px-5 hover:bg-red-500 hover:text-white"
              onClick={() => {
                deleteSelectedPaths();
                dispatcher(resetSelection());
              }}
            >
              Delete selected Paths
            </button>
          }
        </div>
        <div className="w-full border-2 border-gray-700 rounded-md max-h-[25rem] overflow-y-auto">
          <table className="w-full max-h-full text-sm text-center text-gray-700 font-bold">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="w-4 pl-6">
                  <input type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    onChange={(e)=>selectOrDeselectAllPaths(e.target.checked)}
                  />
                </th>
                <th scope="col" className="p-5">Departure</th>
                <th scope="col" className="p-5">Arrival</th>
                <th scope="col" className="p-5">Distance</th>
                <th scope="col" className="p-5">Price</th>
                <th scope="col" className="p-5">Status</th>
                <th className="max-w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paths.length > 0 ? (
                paths.map((path) => (
                  <tr key={path.id} className="bg-white hover:bg-gray-100">
                    <td className="w-4 pl-6">
                      <input type="checkbox" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        onChange={(e)=>selectOrDeselect(path.id,e.target.checked)}
                        checked={selected.includes(path.id)?true:false}
                      />
                    </td>
                    <td className="p-5">{path.departure.name}</td>
                    <td className="p-5">{path.arrival.name}</td>
                    <td className="p-5">{path.distance} KM</td>
                    <td className="p-5">{path.price} MAD</td>
                    <td className="p-5">
                      <div className="flex justify-center items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            path.active ? "bg-emerald-500" : "bg-red-500"
                          } mr-2`}
                        ></div>
                        {path.active ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="p-5 flex justify-center gap-3 items-center">
                      <button
                        className={`font-bold ${
                          path.active
                            ? "hover:text-purple-700"
                            : "hover:text-emerald-500"
                        }`}
                        onClick={() => changeStatus(path.id, !path.active)}
                      >
                        {path.active ? "Disable" : "Activate"}
                      </button>
                      <button className="font-bold hover:text-amber-500"
                        onClick={()=>{
                            dispatcher(setWindowType("update"));
                            dispatcher(setPathToUpdate(path));
                            dispatcher(resetSelection());
                            dispatcher(openWindow());
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="font-bold hover:text-red-500"
                        onClick={() => {
                          dispatcher(openPanel({
                            operation_type: "Delete Path",
                            Impact: "danger",
                            executeParams: path.id,
                          }))
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-gray-900 capitalize font-medium bg-white hover:bg-gray-50">
                  <td colSpan="7" className="py-8 text-center">
                    <p>No Paths were found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {triggerWindow == true && triggerType === "Transfers" && (
        <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
          <div className="w-full absolute z-10">
            <TableCard title={windowType=="create" ? "Create A New Transfer Path" : "Update a Transfer Path"}>
              <TransferForm windowType={windowType} />
            </TableCard>
          </div>
        </div>
      )}
      {
        confirmOp.value == true &&
        <ConfirmOp operation_type={confirmOp.operation_type} Impact={confirmOp.Impact} execute={DeleteSinglePath}/>
      }
    </div>
  );
};

export default TransferTable;
