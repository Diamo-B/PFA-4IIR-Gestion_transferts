import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetToast } from "../../../Redux/toast";
import { setPeriods, removePeriod, addPeriod} from "../../../Redux/periods";

const Table = () => {
  let dispatch = useDispatch();
  let {periods} = useSelector((state) => state.periods);
  
  useEffect(() => {
    fetch("/api/period/getAll", {
      method: "get",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      dispatch(setPeriods(response));
    })
    .catch((err) => {
        console.error(err);
        dispatch(
          SetToast({
            type: "error",
            message: "An unknown error has occured!!",
            reload: false,
          })
        );
    });
  }, []);


  let deleteSinglePeriod = (id) => {
    fetch("/api/period/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ 
        id: id 
      })
    }).then(async (res) => {
      let response = await res.json();
      console.log(response);
      dispatch(
        SetToast({
          type: "Success",
          message: `The ${response.label} period was deleted successfully!!`,
          reload: false,
        })
      );
      periods.length > 0 && dispatch(removePeriod(response.id));
    }).catch((err) => {
      console.error(err);
      dispatch(
        SetToast({
          type: "error",
          message: "An unknown error has occured!!",
          reload: false,
        })
      );
    });
  }
  return (
    <>
      <table className="w-full text-gray-500 relative text-center h-full">
        <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40 ">
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
              Period Name
            </th>
            <th scope="col" className="px-6 py-3">
              Starting Date
            </th>
            <th scope="col" className="px-6 py-3">
              Ending Date
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            periods.length > 0 ? 
            periods.map((period) => (
              <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase"
                key={period.id}
              >
                <th className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </div>
                </th>
                <td scope="row" className="px-6 py-4">
                  {period.label}
                </td>
                <td className="px-6 py-4">{period.start}</td>
                <td className="px-6 py-4">{period.end}</td>
                <td className="px-6 py-4">{period.price} MAD</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="font-bold hover:text-amber-500">
                      Update
                    </button>
                    <button className="font-bold hover:text-red-500"
                      onClick={() => deleteSinglePeriod(period.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
            :
            //? Empty record
            <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
              <th className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    disabled={true}
                  />
                </div>
              </th>
              <th scope="row" className="px-6 py-4">
                ----
              </th>
              <td className="px-6 py-4">----</td>
              <td className="px-6 py-4">----</td>
              <td className="px-6 py-4">----</td>
              <td className="px-6 py-4">----</td>
            </tr>
          }
          
        </tbody>
      </table>
    </>
  );
};

export default Table;
