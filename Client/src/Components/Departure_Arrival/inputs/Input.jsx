import { useState } from "react";

const Input = ({type, placeholder, icon, activate, setInputType, inptype}) => {
    let [luxuary, isLuxuary] = useState(false);
  return (
    <div className="flex w-full h-full justify-center items-center relative">
    {
        type == "Category"?
            <div
                placeholder={placeholder}
                className={`flex justify-center items-center border-2 border-black rounded-lg w-full h-3/5 text-center hover:cursor-pointer ${luxuary && "bg-indigo-400"}`}
                onClick={() => isLuxuary(prev => !prev)}
            >
                {icon}
                <p className={`${luxuary?'text-black':"text-gray-400"}`}>Enable Luxury Vehicules</p>
            </div>
        :
        <>
            <input
                type={type}
                placeholder={placeholder}
                className="border-2 border-black rounded-lg w-full h-3/5 text-center"
                onFocus={(event) => {
                if (activate) {
                    event.target.disabled = true; // Disables the input when it's out of focus
                    setInputType(inptype);
                    activate(true);
                }
                }}
                onBlur={(event) => {
                event.target.disabled = false; // Enable the input when it's out of focus
                }}
            />
            {icon}
        </>
    }
    </div>
  );
};

export default Input;
