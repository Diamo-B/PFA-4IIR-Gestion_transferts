import { UilFidgetSpinner } from '@iconscout/react-unicons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { shouldUnmount, shouldMount } from '../../Redux/Gen/Loading';

const LoadingPanel = () => {
    let dispatcher = useDispatch();
    
    useEffect(() => {
        dispatcher(shouldMount())
        const timeoutId = setTimeout(() => {
        // Wait a second then unmount the loading panel
            console.log("Unmounting the loading panel");
            dispatcher(shouldUnmount());
        }, 1000);

        return () => {
        clearTimeout(timeoutId);
        };
    }, []);

    return ( 
        <div className="w-full h-full z-40 absolute top-0 left-0 bg-slate-500/70 flex justify-center items-center">
            <UilFidgetSpinner className="text-white animate-spin" size="50" />
        </div>
    );
}
 
export default LoadingPanel;