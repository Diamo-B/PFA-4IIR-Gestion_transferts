import * as yup from "yup";

// Custom Yup validation function for json format
const isValidJson = (value) => {
  if (value === "") {
    return true; // Treat empty string as valid JSON
  }

  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

const createSchema = yup.object().shape({
  label: yup.string().required("Label is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price can't be negative")
    .required("Price is required")
    .nonNullable("Price is required"),
  params: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === "") return "{}";
      return value; // Return the original value if not empty
    })
    .test("is-json", "Params must be a valid JSON", isValidJson)
    .notRequired()
    .nullable(),
});


const updateSchema = yup.object().shape({
  label: yup.string().required("Label is required"),
  price: yup.number().typeError("Price must be a number").positive("Price can't be negative").notRequired().nullable(),
  params: yup.string() 
  .test("is-json", "Params must be a valid JSON", isValidJson).notRequired().nullable(),
});

export { createSchema, updateSchema };
