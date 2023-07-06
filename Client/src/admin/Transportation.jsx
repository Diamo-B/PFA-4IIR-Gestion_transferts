import Models from "../Components/Admin/Transportation/Models/Models";
import Vehicules from "../Components/Admin/Transportation/Vehicules/Vehicules";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../Components/Toast/Toast";
import { disableToast, setToast } from "../Redux/Gen/toast";
import { useEffect } from "react";
import { setModels } from "../Redux/Admin/Transportation";
import { isLoading,doneLoading } from "../Redux/Gen/Loading";
import LoadingPanel from "../Components/LoadingPanel/LoadingPanel";

const Transportation = () => {
  let { toast } = useSelector((state) => state.toast);
  let {loading, unmount} = useSelector(state => state.loading);
  let dispatch = useDispatch();

  //TODO: fetch the models
  useEffect(() => {
    dispatch(isLoading());
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
            setToast({
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
          setToast({
            type: "Error",
            message: "An unknown error occured while fetching the models!!",
            reload: false,
          })
        );
      }).finally(() =>
        dispatch(doneLoading())
      );
  }, []);

  return (
    <>
    <div className="h-full w-full grid grid-cols-4 gap-5 p-5">
      {
        (loading || !unmount) &&
          <LoadingPanel />
      }
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
    </>
  );
};

export default Transportation;
