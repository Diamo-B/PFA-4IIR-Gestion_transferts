import { useDispatch, useSelector } from "react-redux";
import { SetToast } from "../../../../../Redux/toast";
import { removePeriod } from "../../../../../Redux/periods";

const useDeletePeriod = () => {
    const dispatch = useDispatch();
    let {periods} = useSelector((state) => state.periods);

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

    return { deleteSinglePeriod };
}

export default useDeletePeriod