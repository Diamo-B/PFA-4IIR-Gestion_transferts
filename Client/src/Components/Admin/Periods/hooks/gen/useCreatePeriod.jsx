import { useDispatch } from "react-redux";
import { SetToast } from "../../../../../Redux/toast";
import { format, parseISO } from "date-fns";
import { addPeriod } from "../../../../../Redux/periods";

const useCreatePeriod = () => {
    let dispatch = useDispatch();

    let createPeriod = (data,reset) => {
    console.log(data);
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
      }).finally(() => {
        reset();
      });
  };
  return { createPeriod };
};

export default useCreatePeriod;
