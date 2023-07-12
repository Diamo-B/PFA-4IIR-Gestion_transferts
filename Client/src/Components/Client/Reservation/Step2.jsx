import { UilArrowLeft, UilArrowRight  } from '@iconscout/react-unicons'
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { activateStep1 } from "../../../Redux/Client/Reservation";
import useOnMountEffects from './Step2_Components/hooks/useOnMountEffects';
import { UilSadDizzy } from '@iconscout/react-unicons'
import { useEffect } from 'react';
const Step2 = () => {
    let dispatch = useDispatch();
    let { register, getValues, formState: { errors }, reset } = useFormContext();
    let { recommendedVehicles } = useSelector(state => state.reservation);
    useOnMountEffects();

    useEffect(() => {
        console.log(recommendedVehicles);
    }, [recommendedVehicles])
    return ( 
        <div className="w-full h-full flex-grow flex justify-center items-center">
            <div className=" w-9/12 h-[38rem] border-2 border-indigo-400 bg-white rounded-xl dark:bg-slate-500">
                <h1 className='text-xl font-bold text-slate-600 text-center pt-5'>Choose Vehicles ({getValues("travelers")} Travelers) </h1>
                
                <div className="mx-5 flex py-5 justify-center items-center h-[75%]">
                    <div className=" h-full w-1/2 pb-5 border-2 border-slate-500 rounded-xl overflow-y-scroll no-scrollbar">
                        
                        <div className="w-full py-5 text-center sticky top-0 mb-5 bg-white ">
                            <h1 className='text-xl font-bold text-slate-600'>Recommended For You</h1>
                        </div>
                        <div className="flex flex-col items-center gap-5 h-full p-5 ">
                            {
                                recommendedVehicles.length > 0 ?
                                
                                    recommendedVehicles.map((vehicule) => (
                                        <div className='w-full h-full border-2 border-red-500 py-10 p-5'>
                                            <div>
                                                <p>{vehicule.Brand} {vehicule.sub_Brand}</p>
                                                <p>Type: {vehicule.model?.label}</p>
                                                <p>Number of Places: {vehicule.places}</p>
                                                {
                                                    vehicule.lux &&
                                                    <p>Luxury</p>
                                                }
                                            </div>
                                        </div>                                            
                                    ))
                                
                                :
                                (
                                    <p>We are sorry. No recommendations are available this time <UilSadDizzy/></p>
                                )
                            }
                        </div>
                    </div>

                    <div className='mx-5'>
                        <h1 className='text-xl font-bold text-slate-600'>Or</h1>
                    </div>
                    
                    <div className=" h-full w-1/2  border-2 border-slate-500 rounded-xl overflow-y-auto no-scrollbar">
                        <div className="w-full py-5 text-center sticky top-0 mb-5 bg-white ">
                            <h1 className='text-xl font-bold text-slate-600'>Custom Choice</h1>
                        </div>
                        <div className="flex flex-col items-center gap-5 h-full p-5 ">

                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-36 w-full h-[15%] border-t-2 border-slate-400'>
                    <button className='btn w-36 flex justify-center items-center hover:bg-red-500 group'
                        type='button'
                        onClick={() => dispatch(activateStep1()) && reset()}
                    >
                        <UilArrowLeft className="inline group-hover:text-white"/> 
                        <p className='inline group-hover:text-white'>back</p> 
                    </button>
                    <button className='btn w-36 flex justify-center items-center hover:bg-emerald-500 group'
                        type='submit'
                    >
                        <p className='inline group-hover:text-white'>Next</p> 
                        <UilArrowRight className="inline group-hover:text-white"/> 
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Step2;