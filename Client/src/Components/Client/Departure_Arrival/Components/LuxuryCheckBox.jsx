import { useState } from "react";
import { UilCarSideview } from "@iconscout/react-unicons";
import { Controller, useController } from "react-hook-form";

const LuxuryCheckbox = ({ inputRegisterName, control, rules }) => {
  const { field } = useController({
    name: inputRegisterName,
    control,
    rules,
    defaultValue: false
  });

  const [isChecked, setIsChecked] = useState(field.value);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    field.onChange(checked);
  };

  return (
    <>
      <input
        type="checkbox"
        className="sr-only"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <div
        className={`relative flex justify-center items-center border-2 border-black rounded-lg w-full h-3/5 text-center hover:cursor-pointer ${
          isChecked ? "bg-indigo-400 text-white font-bold" : "bg-transparent"
        }`}
        onClick={() => {
          setIsChecked(!isChecked);
          field.onChange(!isChecked);
        }}
      >
        <p className="select-none">Enable Luxury Vehicles</p>
        <UilCarSideview className="absolute left-2" />
      </div>
    </>
  );
};

export default LuxuryCheckbox;
