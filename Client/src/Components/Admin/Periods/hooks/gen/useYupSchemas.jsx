import * as yup from "yup";
import { parse } from "date-fns";

const useYupSchemas = () => {
  let createSchema = yup.object().shape({
    name: yup.string().required("Period's name is required"),
    price: yup
      .number()
      .required("Price is required")
      .typeError("Price must be a number")
      .positive("Price must be greater than 0"),
    startingDate: yup
      .date()
      .required("Starting date is required")
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      }),
    endingDate: yup
      .date()
      .required("Ending date is required")
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      }),
  });

  let updateSchema = yup.object().shape({
    name: yup.string().nullable(),
    price: yup
      .number()
      .nullable()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0"),
    startingDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      }),
    endingDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) => {
        return parse(originalValue, "dd-MM-yyyy", new Date());
      }),
  });
  
  return { createSchema, updateSchema };
}
export default useYupSchemas;