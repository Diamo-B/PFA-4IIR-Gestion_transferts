const Input = ({type, placeholder, value, icon, activate, setInputType, inptype, resetField, formName}) => {

  return (
    <div className="flex w-full h-full justify-center items-center relative">
        <input
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            className="border-2 border-black rounded-lg w-full h-3/5 text-center"
            onFocus={(event) => {
              if (activate) {
                  event.target.disabled = true; // Disables the input when it's out of focus
                  setInputType(inptype);
                  activate(true);
              }
            }}
            onBlur={(event) => {
              // Enable the input when it's out of focus
              event.target.disabled = false; 
            }}
        />
        {icon}
    </div>
  );
};

export default Input;
