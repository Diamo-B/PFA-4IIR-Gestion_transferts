import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../../../Redux/Gen/toast";
import { format, parseISO } from "date-fns";
import {
  addPeriod,
  clearSelectedPeriods,
  disableUpdateMode,
  performUpdatePeriod,
  removePeriod,
  removePeriods,
  setPeriods,
} from "../../../../../Redux/Admin/periods";

const usePeriodManipulation = () => {
  let dispatch = useDispatch();
  let { updateMode, periods, selectedPeriods } = useSelector((state) => state.periods);

  let getAllPeriods = () => {
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
        setToast({
          type: "error",
          message: "An unknown error has occured!!",
          reload: false,
        })
      );
    });
  };

  let createPeriod = (data, reset) => {
    fetch("/api/period/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        label: data.name,
        startDate: data.startingDate,
        endDate: data.endingDate,
        price: data.price,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.message)
          dispatch(
            setToast({
              message: response.message,
              type: "Error",
              reload: false,
            })
          );
        else {
          dispatch(
            setToast({
              message: `The ${response.label} period was created successfully`,
              type: "Success",
              reload: false,
            })
          );
          response.start = format(parseISO(response.start), "dd-MM-yyyy");
          response.end = format(parseISO(response.end), "dd-MM-yyyy");
          dispatch(addPeriod(response));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setToast({
            message: "An unknown error has occurred",
            type: "Error",
            reload: false,
          })
        );
      })
      .finally(() => {
        reset();
      });
  };

  let updatePeriod = (data, reset) => {
    fetch("/api/period/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        label: data.name,
        startDate: data.startingDate,
        endDate: data.endingDate,
        price: data.price,
        id: updateMode.value.id,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.message) {
          dispatch(
            setToast({
              message: response.message,
              type: "Error",
              reload: false,
            })
          );
        } else {
          response.start = format(parseISO(response.start), "dd-MM-yyyy");
          response.end = format(parseISO(response.end), "dd-MM-yyyy");
          dispatch(performUpdatePeriod(response));
          dispatch(
            setToast({
              message: `The period was updated successfully`,
              type: "Info",
              reload: false,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setToast({
            message: "An unknown error has occurred",
            type: "Error",
            reload: false,
          })
        );
      })
      .finally(() => {
        dispatch(disableUpdateMode());
        reset();
      });
  };

  let deleteSinglePeriod = (id) => {
    fetch("/api/period/delete", {
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
        let response = await res.json();
        dispatch(
          setToast({
            type: "Success",
            message: `The ${response.label} period was deleted successfully!!`,
            reload: false,
          })
        );
        periods.length > 0 && dispatch(removePeriod(response.id));
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setToast({
            type: "error",
            message: "An unknown error has occured!!",
            reload: false,
          })
        );
      });
  };

  let deleteSelectedPeriods = () => {
    fetch("/api/period/removeMany", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ids: selectedPeriods})
    }).then(async (res) => {
      let response = await res.json();
      dispatch(removePeriods(selectedPeriods))
      dispatch(setToast({
        type: "Success",
        message: response.message,
        reload: false
      }))
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(clearSelectedPeriods());
    })
  }

  return { getAllPeriods, createPeriod, updatePeriod, deleteSinglePeriod, deleteSelectedPeriods };
};

export default usePeriodManipulation;
