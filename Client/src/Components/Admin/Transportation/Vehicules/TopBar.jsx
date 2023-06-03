import Search from "../../users/Search";
import { UilPlus, UilMinus} from '@iconscout/react-unicons'
const TopBar = () => {
    return ( 
        <div className="flex items-center justify-between py-4 px-5 rounded-lg bg-white dark:bg-gray-800 ">
            <div className="flex gap-5">
                <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-emerald-500 group">
                    <UilPlus className="text-gray-700 group-hover:text-white "/>
                </button>
                <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-red-500 group">
                    <UilMinus className="text-gray-700 group-hover:text-white "/>
                </button>
            </div>
            <Search />
        </div>
    );
}
 
export default TopBar;