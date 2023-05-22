import { UilMapMarker, UilLocationArrow } from '@iconscout/react-unicons'
import {useDispatch, useSelector} from 'react-redux';
import { setType } from '../../../Redux/locations';
const Card = () => {
    let dispatcher = useDispatch();
    let type = useSelector(state => state.locationPanel.triggerType);
    return (
        <div className="flex justify-center items-center gap-5 w-full">
            <button
                className={`w-2/12 border  border-gray-200 rounded-full shadow flex justify-center flex-col items-center gap-3 ${type === "Location" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 "}`}
                onClick={()=>{dispatcher(setType("Location"))}}
            >
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-lg">Locations</h1>
                    <div className="flex justify-center items-center">
                        <UilMapMarker />
                        <p className="font-bold">50</p>
                    </div>
                </div>
            </button>
            <button
                className={`w-2/12 border border-gray-200 rounded-full shadow flex justify-center flex-col items-center gap-3 ${type === "Transfers" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 "}`}
                onClick={()=>{dispatcher(setType("Transfers"))}}
            >
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <h1 className="font-bold text-lg">Paths</h1>
                        <div className="flex justify-center items-center">
                            <UilLocationArrow />
                            <p className="font-bold">25</p>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Card;