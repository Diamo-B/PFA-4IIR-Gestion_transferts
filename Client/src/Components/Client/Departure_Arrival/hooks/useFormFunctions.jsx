import { format } from 'date-fns';
import * as yup from 'yup'; 

const useFormFunctions = () => {

    const schema = yup.object().shape({
        Departure: yup.string().required("Departure is required"),
        Arrival: yup.string().required("Arrival is required"),
        DepartureDateTime: yup.date().default(new Date()).required("Departure date is required"),
        ReturnDateTime: yup.date().default(null).notRequired().nullable()
        .when('DepartureDateTime', (DepartureDateTime, schema) => {
            return DepartureDateTime && schema.min(DepartureDateTime, "Return date must be after departure date");
        })
        ,
        travelers: yup.number().positive().integer().min(1,"the number of travelers must be greater than or equal to 1").required("The travelers field is required").typeError("The travelers must recieve a number"),
        luxury: yup.boolean().required("Luxury is required"),
    });
    const MakeReservation = (data) => {
        console.log(data);
    }

    return { schema, MakeReservation };
}

export default useFormFunctions;