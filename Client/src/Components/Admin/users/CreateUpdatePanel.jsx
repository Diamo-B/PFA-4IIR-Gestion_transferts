import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { hide, hideUpdate } from "../../../Redux/UsersPanel";
import { useState } from "react";

const CreateUpdateAgent = ({ opType }) => {
    const dispatcher = useDispatch();
    let userToModify = useSelector( (state) => state.userPanel.showUpdateUserPanel.user );
    if (opType == "create") userToModify = null;
    let [emailNotValid, setEmailNotValid] = useState(false);
    let [isLoading, setIsLoading] = useState(false);

    const createSchema = yup.object().shape({
        FirstName: yup
            .string()
            .required("Please provide the Agent's first name"),
        LastName: yup.string().required("Please provide the Agent's last name"),
        Email: yup
            .string()
            .email()
            .required("Please provide the Agent's Email"),
        Password: yup
            .string()
            .min(4)
            .max(20)
            .required("Please provide a Password"),
        PasswordConf: yup
            .string()
            .min(4)
            .max(20)
            .oneOf([yup.ref("Password"), null], "Passwords must match")
            .required("Please confirm the password"),
    });

    const updateSchema = yup.object().shape({
        FirstName: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value)),
        LastName: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value)),
        Email: yup
            .string()
            .email()
            .nullable()
            .transform((value) => (value === "" ? null : value)),
        Password: yup
            .string()
            .min(4)
            .max(20)
            .nullable()
            .transform((value) => (value === "" ? null : value)),
        PasswordConf: yup
            .string()
            .when("Password", {
                is: (Password) => Password && Password.length > 0,
                then: ()=>yup
                    .string()
                    .min(4)
                    .max(20)
                    .required("Please confirm the password")
                    .oneOf([yup.ref("Password"), null], "Passwords must match")
                    .transform((value) => (value === "" ? null : value)),
                otherwise: ()=>yup.string().nullable()
                .oneOf([yup.ref("Password"), null], "Passwords must match")
                .transform((value) => (value === "" ? null : value)),
            })
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(opType == "create" ? createSchema : updateSchema),
    });

    let onSubmit = (data) => {
        setIsLoading(true);
        let { FirstName, LastName, Email, Password } = data;

        //? Checking if the user already exist in the db
        fetch("/api/user/getMail/" + Email, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then(async (res) => {
            if (res.status === 200) {
                let data = await res.json();
                if (data.email.toLowerCase() == Email.toLowerCase())
                    setEmailNotValid(true);
            } else if (res.status === 500) {
                let error = await res.json();
                if (error.code == "notFound") {
                    fetch("/api/agent/create", {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "jwt"
                            )}`,
                        },
                        body: JSON.stringify({
                            firstName: FirstName,
                            lastName: LastName,
                            email: Email,
                            password: Password,
                        }),
                    }).then(async (res) => {
                        if (!res.ok) {
                            throw new Error("User Creation error");
                        }
                        const data = await res.json();
                        location.reload();
                    });
                }
            }
        });
        setIsLoading(false);
    };

    let onUpdate = (data) => {
        setIsLoading(true);
        let { FirstName, LastName, Email, Password } = data;
        fetch("/api/user/update", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                firstName: FirstName,
                lastName: LastName,
                email: userToModify.email,
                newEmail: Email,
                password: Password,
            }),
        })
            .then(async (res) => {
                let responseData = await res.json();
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false);
    };
    return (
        <div className="mt-5 w-1/2 bg-white rounded-xl dark:bg-slate-700">
            <div className=" text-center py-3 text-black">
                <h1 className="text-xl font-medium">
                    {opType == "create"
                        ? "Create a New Agent"
                        : "Update an Agent"}
                </h1>
                <form
                    onSubmit={
                        opType == "create"
                            ? handleSubmit(onSubmit)
                            : handleSubmit(onUpdate)
                    }
                    method="POST"
                    className="my-5 grid place-items-center gap-4"
                >
                    <div className="w-full flex justify-center gap-16 px-3">
                        <div className="w-1/2">
                            <input
                                type="text"
                                placeholder={
                                    userToModify
                                        ? userToModify.firstName
                                        : "First Name"
                                }
                                className="border-2 relative border-black rounded-lg w-full h-10 text-center"
                                autoComplete="off"
                                {...register("FirstName")}
                            />
                            <small className="text-red-600 font-medium">
                                {errors.FirstName?.message}
                            </small>
                        </div>
                        <div className="w-1/2">
                            <input
                                type="text"
                                placeholder={
                                    userToModify
                                        ? userToModify.firstName
                                        : "Last Name"
                                }
                                className="border-2 relative border-black rounded-lg w-full h-10 text-center"
                                autoComplete="off"
                                {...register("LastName")}
                            />
                            <small className="text-red-600 font-medium">
                                {errors.LastName?.message}
                            </small>
                        </div>
                    </div>

                    <div className="w-3/5">
                        <input
                            type="text"
                            placeholder={
                                userToModify ? userToModify.email : "Email"
                            }
                            className="border-2 relative border-black rounded-lg w-full h-10 text-center"
                            autoComplete="off"
                            {...register("Email")}
                        />
                        <small className="text-red-600 font-medium">
                            {errors.Email?.message}
                        </small>
                        <small className="text-red-600 font-medium">
                            {emailNotValid && "Email already exists!!"}
                        </small>
                    </div>

                    <div className="w-3/5">
                        <input
                            type="password"
                            placeholder={
                                userToModify ? "New Password" : "Password"
                            }
                            className="border-2 relative border-black rounded-lg w-full h-10 text-center"
                            autoComplete="off"
                            {...register("Password")}
                        />
                        <small className="text-red-600 font-medium">
                            {errors.Password?.message}
                        </small>
                    </div>

                    <div className="w-3/5">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="border-2 relative border-black rounded-lg w-full h-10 text-center"
                            autoComplete="off"
                            {...register("PasswordConf")}
                        />
                        <small className="text-red-600 font-medium">
                            {errors.PasswordConf?.message}
                        </small>
                    </div>

                    <div className="w-full flex justify-center items-center gap-10">
                        {isLoading ? (
                            <button
                                disabled
                                type="button"
                                className="px-5 mr-2 text-sm text-gray-900 bg-white  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-3/12 py-1 border-2 border-black rounded-full font-bold"
                            >
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"
                                    />
                                </svg>
                                Loading...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-3/12 py-1 border-2 border-black rounded-full font-bold hover:border-green-700 hover:bg-emerald-500 hover:text-white"
                            >
                                {opType == "update" ? "Update" : "Submit"}
                            </button>
                        )}

                        <button
                            type="button"
                            className="w-3/12 py-1 border-2 border-black rounded-full font-bold hover:border-red-700 hover:bg-red-600 hover:text-white "
                            onClick={() =>
                                dispatcher(
                                    opType == "update" ? hideUpdate() : hide()
                                )
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUpdateAgent;
