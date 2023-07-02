import * as yup from "yup";

// Custom Yup validation function for json format
const isValidJson = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
};

const createSchema = yup.object().shape({
    label: yup.string().required("Label is required"),
    price: yup.number().typeError("Price must be a number").positive("Price can't be negative").required("Price is required").nonNullable("Price is required"),
    params: yup.string()
    .transform((value, originalValue)=> originalValue.replace(/\s+/g, ''))
    .test("is-json", "Params must be a valid JSON", isValidJson).notRequired().nullable(),
});

const updateSchema = yup.object().shape({

});

export { createSchema, updateSchema };
