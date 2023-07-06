import { UilTimes, UilCheck, UilInfo, UilExclamation } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Toast = ({Type, Message, trigger, reload}) => {
  let [classes,setClasses] = useState();
  let dispatcher = useDispatch();
  useEffect(()=>{
    switch(Type)
    {
      case "Success":
        setClasses("text-green-700 bg-green-300")
      break;
      case "Error":
        setClasses("text-red-700 bg-red-400")
      break;
      case "Info":
        setClasses("text-indigo-700 bg-indigo-100 dark:bg-indigo-300")
      break;
    }
    
    setTimeout(()=>{
      trigger && dispatcher(trigger());
      if(reload === true) 
        location.reload()
    },2500);
  },[])
  return (
    <div
      className={` absolute right-5 bottom-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
    >
      <div className={`flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${classes}`}>
        {Type == "Success" && <UilCheck/>}
        {Type == "Error" && <UilExclamation/>}
        {Type == "Info" && <UilInfo/>}
      </div>
      <div className="ml-3 text-sm font-normal">{Message}</div>
      <button
        type="button"
        className="ml-auto bg-white text-gray-400 hover:text-gray-900 rounded-sm focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 flex justify-center items-center h-5 w-5 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ease-out"
        onClick={()=>{
          trigger && dispatcher(trigger());
          if(reload === true) location.reload();
        }}
      >
        <UilTimes />
      </button>
    </div>
  );
};

export default Toast;
