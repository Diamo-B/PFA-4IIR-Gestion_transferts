import { UilAngleDoubleUp, UilAngleDoubleDown } from '@iconscout/react-unicons';
import { parse, format, add, sub } from 'date-fns';
import { useState } from 'react';

const Clock = () => {
  const currentTime = new Date();
  let StringHours = format(currentTime, 'HH');
  let StringMins = format(currentTime, 'mm');

  let [Hour,setHour] = useState(StringHours);
  let [Min,setMin] = useState(StringMins);

  let addHour = (StringHours) => {
    let dateHours = parse(StringHours, 'HH', new Date());
    let newHour = add(dateHours,{hours: 1});
    setHour(format(newHour,'HH'))
  }

  let removeHour = (StringHours) => {
    let dateHours = parse(StringHours, 'HH', new Date());
    let newHour = sub(dateHours,{hours: 1});
    setHour(format(newHour,'HH'))
  }

  let addMin = (StringMins) => {
    let dateMins = parse(StringMins, 'mm', new Date());
    let newMin = add(dateMins,{minutes: 1});
    setMin(format(newMin,'mm'))
  }

  let removeMin = (StringMins) => {
    let dateMins = parse(StringMins, 'mm', new Date());
    let newMin = sub(dateMins,{minutes: 1});
    setMin(format(newMin,'mm'))
  }

  return (
    <div className='flex justify-center items-center gap-3'>
      <div className="flex flex-col justify-center items-center">
        <span onClick={()=>addHour(Hour)}>
          <UilAngleDoubleUp />
        </span>
        {Hour}
        <span onClick={()=>removeHour(Hour)}>
          <UilAngleDoubleDown />
        </span>
      </div>
      <span>:</span>
      <div className="flex flex-col justify-center items-center">
        <span onClick={()=>addMin(Min)}>
          <UilAngleDoubleUp />
        </span>
        {Min}
        <span onClick={()=>removeMin(Min)}>
          <UilAngleDoubleDown />
        </span>
      </div>
    </div>
  );
};

export default Clock;
