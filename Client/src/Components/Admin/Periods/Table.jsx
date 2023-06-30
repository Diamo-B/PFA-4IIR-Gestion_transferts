import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedPeriods, disableUpdateMode, enableUpdateMode, removePeriods, setSelectedPeriods } from "../../../Redux/periods";
import EmptyRecord from "./EmptyTableRecord";
import usePeriodManipulation from "./hooks/gen/usePeriodManipulation";
import { SetToast } from "../../../Redux/toast";
import { openPanel } from "../../../Redux/confirmationPanel";

const Table = ({reset}) => {
  let dispatch = useDispatch();
  let {periods, selectedPeriods} = useSelector((state) => state.periods);
  let {getAllPeriods} = usePeriodManipulation();
  let gencheckbox = useRef(null);

  useEffect(() => {
    getAllPeriods();
  }, []);

  let toggleAllPeriodsSelection = (e) => {
    if(e.target.checked == true)
    {
      if(periods.length == 0)
        dispatch(SetToast({
          type: "Error",
          message: "No periods to select",
          reload: false
        }))
      else
      {
        let periodIds = periods.map((period) => period.id);
        dispatch(setSelectedPeriods(periodIds));
      }
    }
    else
      dispatch(clearSelectedPeriods());
  };

  let toggleSinglePeriodselection = (e, periodId) => {
    const isChecked = e.target.checked;
  
    if (isChecked)
      dispatch(setSelectedPeriods([...selectedPeriods, periodId]));
    else 
    {
      dispatch(setSelectedPeriods(selectedPeriods.filter(id => id !== periodId)));
      gencheckbox.current.checked = false;
    }
  };

  return (
    <>
      {
        (periods.length > 1 && selectedPeriods.length > 1) && 
        <div className="flex justify-center items-center text-black">
          <button className="btn px-3 hover:bg-red-500 hover:text-white"
            onClick={() => {
              dispatch(disableUpdateMode())
              reset()
              dispatch(openPanel({
                operation_type: "Delete Selected Periods",
                Impact: "danger"
              }))
              gencheckbox.current.checked = false;
            }}
          >
            Delete Selected Periods
          </button>
        </div>
      }
      <table className="w-full text-gray-500 relative text-center h-full">
        <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40 ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  disabled={periods.length <= 1}
                  onClick={toggleAllPeriodsSelection}
                  ref={gencheckbox}
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
                      checked={selectedPeriods.includes(period.id)}
                      onChange={(e)=>toggleSinglePeriodselection(e, period.id)}
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
                    <button className="font-bold hover:text-amber-500"
                      onClick={() => {
                        dispatch(enableUpdateMode(period));
                      }}
                    >
                      Update
                    </button>
                    <button className="font-bold hover:text-red-500"
                      onClick={() =>{
                        dispatch(disableUpdateMode())
                        reset()
                        dispatch(openPanel({
                          operation_type: "Delete Period",
                          Impact: "danger",
                          executeParams: period.id
                        }))
                      } 
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
            :
            <EmptyRecord />
          }
          
        </tbody>
      </table>
    </>
  );
};

export default Table;
