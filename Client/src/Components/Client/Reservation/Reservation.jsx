import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormFunctions from "./hooks/useFormFunctions";
import Step1 from './Step1';
import { useSelector } from 'react-redux';
import Step2 from './Step2';

const Reservation = () => {
  
  let {step1, step2} = useSelector(state => state.reservation)

  //****************************************************
  //? form
  let { schema, MakeReservation } = useFormFunctions();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });


  let onSubmit = (data) => {
    MakeReservation(data);
  }

 //****************************************************
  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(onSubmit)} 
        className="w-full h-full flex flex-col justify-center items-center flex-1"
      >
        {
          step1 && <Step1 />
        }
        {
          step2 && <Step2 />
        }
      </form>
    </FormProvider>
  );
};

export default Reservation;
