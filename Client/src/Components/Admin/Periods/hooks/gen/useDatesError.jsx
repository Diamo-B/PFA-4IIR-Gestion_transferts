import { useEffect } from 'react';
import { parse, isAfter } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import {
    disableStartingDate,
    disableEndingDate
  } from "../../../../../Redux/Admin/periods";

const useDatesError = (setDatesError, setError, getValues, clearErrors, errors) => {
    let dispatch = useDispatch();

    let { startingDate, endingDate } = useSelector(
        (state) => state.periods
    );

    useEffect(() => {
        const start = getValues("startingDate");
        const end = getValues("endingDate");
        if(start && end && !isAfter(parse(end,"dd-MM-yyyy", new Date()), parse(start,"dd-MM-yyyy", new Date()))){
            if(errors.endingDate?.type === "custom") return;
            setError(
                "endingDate",
                { type: "custom", message: "Ending date must be after starting date" },
                { shouldFocus: false }
            );
            setDatesError(true);
            dispatch(disableStartingDate());
            dispatch(disableEndingDate());
        }
        else
        {
            clearErrors("endingDate");
            setDatesError(false);
        }
    }, [startingDate.active, endingDate.active]);
}

export default useDatesError;
