import Toast from "../Components/Toast/Toast";
import TopPanel from "../Components/Admin/Extras/TopPanel/TopPanel";
import ExtrasTable from "../Components/Admin/Extras/ExtrasTable";
import ConfirmOp from "../Components/ConfirmOperation/ConfirmOp";

import useOnMountEffects  from "../Components/Admin/Extras/Hooks/useOnMountEffects";
import useExtrasManipulation from "../Components/Admin/Extras/Hooks/useExtrasManipulation";
import { useSelector } from "react-redux";
import { disableToast } from "../Redux/toast";


const Extras = () => {

  let { confirmOp } = useSelector((state) => state.confirmationPanel);
  let { toast } = useSelector((state) => state.toast);

  let {deleteSingleExtra, deleteSelectedExtras} = useExtrasManipulation();
  useOnMountEffects(); //? fetches the data and more

  return (
    <div className="h-full w-full flex flex-col gap-5 p-5">
      <div className={`bg-indigo-100 rounded-2xl shadow-lg py-7 px-2 text-gray-700`}>
        <TopPanel />
      </div>

      <div className="bg-indigo-100 rounded-xl p-7 flex-1 h-full overflow-y-auto">
        <ExtrasTable />
      </div>

      {toast.active == true && (
        <Toast
          Type={toast.type}
          Message={toast.message}
          trigger={disableToast}
          reload={toast.reload}
        />
      )}

      {
        confirmOp.value == true &&
        <ConfirmOp operation_type={confirmOp.operation_type} Impact={confirmOp.Impact} execute={confirmOp.executeParams ? deleteSingleExtra : deleteSelectedExtras}/>
      }
    </div>
  );
};

export default Extras;
