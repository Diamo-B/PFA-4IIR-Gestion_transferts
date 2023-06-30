import { useDispatch, useSelector } from "react-redux";
import { SetToast } from "../../../../../Redux/toast";
import { format, parseISO } from "date-fns";
import {
  addPeriod,
  clearSelectedPeriods,
  disableUpdateMode,
  performUpdatePeriod,
  removePeriod,
  removePeriods,
  setPeriods,
} from "../../../../../Redux/periods";

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
        SetToast({
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
            SetToast({
              message: response.message,
              type: "Error",
              reload: false,
            })
          );
        else {
          dispatch(
            SetToast({
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
          SetToast({
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
            SetToast({
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
            SetToast({
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
          SetToast({
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
          SetToast({
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
          SetToast({
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
      dispatch(SetToast({
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
