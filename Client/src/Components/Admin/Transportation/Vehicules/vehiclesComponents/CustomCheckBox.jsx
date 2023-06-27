const CustomCheckBox = ({ value, onChange, defaultValue, disabled }) => {
    const handleChange = (e) => {
      onChange(e.target.checked);
    };
  
    return (
      <input
        type="checkbox"
        disabled={disabled}
        className="sr-only peer"
        defaultChecked={defaultValue}
        onChange={handleChange}
      />
    );
};
  
export default CustomCheckBox;