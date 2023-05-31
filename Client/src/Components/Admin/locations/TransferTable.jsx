import { UilAsterisk } from "@iconscout/react-unicons";
import TableCard from "../../../Components/Admin/locations/TableCard";
import {
  disableRefetch,
  triggerRefetch,
  setWindowType,
  openWindow,
  setPaths,
  SetToast,
  addSelection,
  removeSelection,
  resetSelection,
  setPathToUpdate,
} from "../../../Redux/locations";
import { useSelector, useDispatch } from "react-redux";
import TransferForm from "./TransferForm";
import { useEffect } from "react";

const TransferTable = () => {
  let dispatcher = useDispatch();
  let { triggerWindow, triggerType, windowType, Refetch, selected } = useSelector(
    (state) => state.mapPanel.window
  );
  let { paths } = useSelector((state) => state.mapPanel.paths);

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
        dispatcher(setPaths(results));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatcher(disableRefetch());
  }, [Refetch]);

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
        dispatcher(triggerRefetch());
        dispatcher(
          SetToast({
            type: "Success",
            message: `Path was ${message} successfully!!`,
            reload: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let DeleteSinglePath = (id) => {
    console.log(id);
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
        console.log(result);
        dispatcher(triggerRefetch());
        dispatcher(
          SetToast({
            type: "Success",
            message: `The path linking between ${result.departure.name} and ${result.arrival.name} was deleted successfully!`,
            reload: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatcher(
          SetToast({
            type: "Error",
            message: `An Unknown error occured. If it persists, contact a SuperAdmin`,
            reload: false,
          })
        );
      });
  };

  return (
    <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
      <div className="w-full h-full mt-5 px-5">
        <div className="mb-5 text-center">
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
        </div>
        <div className="w-full border-2 border-gray-700 rounded-xl ">
          <table className="w-full">
            <thead className="border-b-2 border-gray-700">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Status</th>
                <th className="max-w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paths.length > 0 ? (
                paths.map((path) => (
                  <tr key={path.id} className="text-center">
                    <th className="">
                      <input type="checkbox" />
                    </th>
                    <td className="">{path.departure.name}</td>
                    <td className="">{path.arrival.name}</td>
                    <td className="">{path.distance} KM</td>
                    <td className="">{path.price} DH</td>
                    <td className="">
                      <div className="flex justify-center items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            path.active ? "bg-emerald-500" : "bg-red-500"
                          } mr-2`}
                        ></div>
                        {path.active ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="flex justify-center gap-3">
                      <button
                        className={`font-bold ${
                          path.active
                            ? "hover:text-slate-400"
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
                          DeleteSinglePath(path.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <th className="">
                    <input type="checkbox" />
                  </th>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                  </td>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                  </td>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                  </td>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                  </td>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                  </td>
                  <td className="">
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
                    <UilAsterisk className="inline" />
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
              <TransferForm windowType={windowType}/>
            </TableCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferTable;
