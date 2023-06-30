import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { disableEndingDate, disableStartingDate, disableUpdateMode, setReadOnly } from "../../../../../Redux/periods";

const useKeyboardEsc = (reset) => {
    let dispatch = useDispatch()
    let {startingDate, endingDate, updateMode} = useSelector((state) => state.periods);
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Escape') {
            if(startingDate.active == true || endingDate.active == true)
            {
              dispatch(setReadOnly(false));
              dispatch(disableStartingDate());
              dispatch(disableEndingDate()); 
            }
            else if(updateMode.state == true)
            {
              dispatch(setReadOnly(false));
              dispatch(disableUpdateMode());
              reset();
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
    }, [startingDate, endingDate, updateMode]);
}

export default useKeyboardEsc;