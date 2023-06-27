import * as yup from "yup";

const createSchema = yup.object().shape({
    ModelCreate: yup.string().required(),
    BrandCreate: yup.string().required(),
    PlacesCreate: yup
        .number()
        .required("Places is required")
        .positive("Places must be a positive number")
        .integer("Places must be an integer")
        .min(2, "Places must be more or equal 2")
        .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
        .typeError("Places must be a number"),
    LuxuryCreate: yup.boolean().required(),
});

const updateSchema = yup.object().shape({
    Model: yup.string().notRequired(),
    Brand: yup.string().notRequired(),
    Places: yup
        .number()
        .positive("Places must be a positive number")
        .integer("Places must be an integer")
        .min(2, "Places must be more or equal 2")
        .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
        .typeError("Places must be a number")
        .notRequired(),
    Luxury: yup
    .boolean()
    .notRequired()
});


export { createSchema, updateSchema};