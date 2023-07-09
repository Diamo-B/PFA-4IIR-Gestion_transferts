import { Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { setDistinctArrivals, setDistinctDepartures, setUsableData } from "../../../../Redux/Client/activePaths";

const LocationInput = ({
  inputRegisterName,
  placeholder,
  options,
  icon,
  control
}) => {
  const dispatch = useDispatch();
  const { GenActivePathsData, distinctDepartures, distinctArrivals } = useSelector((state) => state.activePaths);


  return (
    <div className="relative w-full">
      <Controller
        name={inputRegisterName}
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <Select
            inputId={inputRegisterName}
            placeholder={placeholder}
            className="text-center font-bold"
            styles={{
              container: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                height: "150%",
                border: "2px solid black",
                paddingTop: 3,
                paddingBottom: 0,
                borderRadius: 10 + "px",
                boxShadow: "none",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: "none",
                width: "100%",
                textAlign: "center",
                border: "none",
                borderRadius: 10 + "px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                borderRadius: 10 + "px",
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                borderRadius: 10 + "px",
                boxShadow: "none",
              }),
            }}
            isSearchable={true}
            isClearable={true}
            hideSelectedOptions={true}
            onBlur={onBlur}
            onChange={(selectedOption) => {
              if(!selectedOption) 
              {
                dispatch(setUsableData(GenActivePathsData));
              }  
              else
              {  
                let idsLeft = selectedOption.value.split(",");
                if (inputRegisterName === "Departure") 
                {
                    dispatch(setDistinctArrivals(
                    distinctArrivals.filter((arrival) =>
                        idsLeft.includes(
                        arrival.id.split(",").find((id) => idsLeft.includes(id))
                        )
                    )
                    ));
                }
                else if(inputRegisterName === "Arrival")
                {
                    dispatch(setDistinctDepartures(
                        distinctDepartures.filter((departure) =>
                            idsLeft.includes(
                            departure.id.split(",").find((id) => idsLeft.includes(id))
                            )
                        )
                    ));
                }
              }
              onChange(selectedOption?.value ?? null);
            }}
            options={options.map((option) => {
              return {
                label: option.departure ?? option.arrival,
                value: option.id,
              };
            })}
          />
        )}
      />
      {icon}
    </div>
  );
};

export default LocationInput;
