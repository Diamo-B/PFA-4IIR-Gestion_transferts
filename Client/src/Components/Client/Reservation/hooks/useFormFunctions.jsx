import { format } from 'date-fns';
import * as yup from 'yup'; 
import { doneLoading, isLoading } from '../../../../Redux/Gen/Loading';
import { useDispatch } from 'react-redux';

const useFormFunctions = () => {
    const dispatch = useDispatch();

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
        /* dispatch(isLoading());

        let arrivalIDs = data.Arrival.split(",");
        let departureIDs = data.Departure.split(",");
        
        data.path = arrivalIDs.filter(id => departureIDs.includes(id)).toString();
        delete data.Arrival;
        delete data.Departure;

        fetch("/api/reservation/create",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(data)
        }).then(async res=>{
            let response = await res.json();
            console.log(response);
            if(res.status == 200)
            {
                
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            dispatch(doneLoading());
        })
 */
        console.log(data);
    }

    return { schema, MakeReservation };
}

export default useFormFunctions;