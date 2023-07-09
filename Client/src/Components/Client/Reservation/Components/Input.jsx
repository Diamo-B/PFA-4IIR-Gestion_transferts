import { useState } from "react";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { format } from "date-fns";

const Input = ({ type, placeholder, icon, activate, setInputType, inptype, formName, field }) => {
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleClearClick = () => {
    formName == "ReturnDateTime" &&
    field.onChange(null);
  };

  const handleInputFocus = (event) => {
    if (activate) {
      event.target.disabled = true;
      setInputType(inptype);
      activate(true);
    }
  };

  const handleInputBlur = (event) => {
    event.target.disabled = false;
  };

  return (
    <div className="flex w-full h-full justify-center items-center relative">
      <input
        type={type}
        placeholder={placeholder}
        value={field.value ? format(field.value, "dd-MM-yyyy HH:mm") : ""}
        className="border-2 border-black rounded-lg w-full h-3/5 text-center"
        disabled={isInputDisabled}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={field.onChange}
      />
      {icon}
      {field.value && formName == "ReturnDateTime" && (
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={handleClearClick}
        >
          <UilTimesCircle />
        </button>
      )}
    </div>
  );
};

export default Input;
