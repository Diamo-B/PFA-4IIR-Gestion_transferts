import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { disableEndingDate, disableStartingDate, setReadOnly } from "../../../../../Redux/periods";

const useKeyboardEsc = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Escape') {
            dispatch(setReadOnly(false));
            dispatch(disableStartingDate());
            dispatch(disableEndingDate()); 
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
}

export default useKeyboardEsc;