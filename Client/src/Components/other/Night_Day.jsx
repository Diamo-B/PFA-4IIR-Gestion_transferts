import { useState } from "react";
import { UilMoon, UilSun } from '@iconscout/react-unicons';
const Night_Day = () => {
    let [isDark, setIsDark] = useState(false);

    let ChangeTheme = () => {
        let Switch = document.getElementById("darkModeSwitch");
        if (Switch.classList.contains('dark'))
        {
            Switch.classList.remove('dark')
            setIsDark(false);
        }   
        else
        {
            Switch.classList.add('dark');
            setIsDark(true);
        }
    }

    return ( 
        <button onClick={ChangeTheme}>
            {
                isDark ?
                    <UilSun className="text-white"/>
                :
                    <UilMoon className="text-slate-700"/>
            }
        </button>
    );
}
 
export default Night_Day;