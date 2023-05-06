import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, addUser } from "../../../Redux/Authorizations";
import { addPermission } from "../../../Redux/Authorizations";
import { removePermission } from "../../../Redux/Authorizations";

const Button = ({ text, agent, op }) => {
    let dispatcher = useDispatch();
    const { selectedAuthorization, modifyMode,modification } = useSelector(
        (state) => state.authorizationPanel
    );
    let [isClicked, setIsClicked] = useState(null);

    useEffect(()=>{
        if(modifyMode == true && selectedAuthorization)
        {
            dispatcher(addUser({ email: agent.user.email, category: [] }));
            dispatcher(
                addCategory({
                    email: agent.user.email,
                    category: { value: selectedAuthorization, permissions: [] },
                })
            );
        }
    },[modifyMode])

    useEffect(()=>{
        let addPerm = () => {
            if(modifyMode == true)
            {    
                if(isClicked == true)
                {
                    dispatcher(
                        addPermission({
                            email: agent.user.email,
                            category: {
                                value: selectedAuthorization,
                                permission: op,
                            }
                        })
                    ); 
                }
                else if (isClicked == false)
                {
                    dispatcher(
                        removePermission({
                            email: agent.user.email,
                            category: {
                                value: selectedAuthorization,
                                permission: op,
                            }
                        })
                    ); 
                }
            }
        }
        addPerm();
    },[isClicked,modification])
    
    let color;
    switch (op) {
        case "read":
            color = "text-green-500";
            break;
        case "create":
            color = "text-amber-500";
            break;
        case "update":
            color = "text-blue-500";
            break;
        case "delete":
            color = "text-red-500";
            break;
        case "crud":
            color = "text-violet-500";
            break;
    }
    let renderColors = (agent) => {
        

        if (
            !modifyMode &&
            agent.categories?.some(
                (cat) =>
                    cat.category.name == selectedAuthorization &&
                    cat.permissions.some(
                        (permission) =>
                            permission.value.toLowerCase() == op.toLowerCase()
                    )
            )
        )
            return color;
        else if (modifyMode) {
            if (isClicked) {
                return color;
            } else if (isClicked === false) {
                return "text-gray-500";
            }
        } else return "text-gray-500";
    };

    return (
        <button
            className={`${renderColors(agent)} font-bold`}
            onClick={() => {
                modifyMode && setIsClicked((prev) => (prev ? false : true));
            }}
        >
            {text}
        </button>
    );
};

export default Button;
