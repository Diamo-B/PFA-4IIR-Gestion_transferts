import Models from "../Components/Admin/Transportation/Models/Models";
import Vehicules from "../Components/Admin/Transportation/Vehicules/Vehicules";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../Components/Toast/Toast";
import { disableToast, SetToast } from "../Redux/toast";
import { useEffect } from "react";
import { activateLoading, disableLoading, disableRefetch, setModels } from "../Redux/Transportation";

const Transportation = () => {
  let { toast } = useSelector((state) => state.toast);
  let { refetch } = useSelector((state) => state.transportation.window);
  let  {isLoading}  = useSelector(state => state.transportation.vehicules)
  let dispatch = useDispatch();

  //TODO: fetch the models
  useEffect(() => {
    dispatch(activateLoading());
    fetch("/api/models/getAll", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.err)
          dispatch(
            SetToast({
              type: "Error",
              message: response.err,
              reload: false,
            })
          );
        else {
          dispatch(setModels(response));
        }
      })
      .catch(async (err) => {
        console.error(err);
        dispatch(
          SetToast({
            type: "Error",
            message: "An unknown error occured while fetching the models!!",
            reload: false,
          })
        );
      });
    dispatch(disableLoading());
    dispatch(disableRefetch());
  }, [refetch]);

  if(isLoading)
  {
    return(
      <div className="text-gray-700 font-bold">Loading ...</div>
    );
  }

  return (
    <div className="h-full w-full grid grid-cols-4 gap-5 p-5">
      <Models />
      <Vehicules />
      {toast.active == true && (
        <Toast
          Type={toast.type}
          Message={toast.message}
          trigger={disableToast}
          reload={toast.reload}
        />
      )}
    </div>
  );
};

export default Transportation;
