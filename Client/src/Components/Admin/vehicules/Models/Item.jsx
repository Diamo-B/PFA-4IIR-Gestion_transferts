import { UilTrashAlt} from "@iconscout/react-unicons";

const Item = ({Text}) => {
    return ( 
        <div className="flex relative group hover:cursor-pointer">
            <div className="w-full text-lg font-bold border-2 border-gray-700 py-2 rounded-full text-center">
                {Text}
            </div>
            <div className=" bg-red-500 rounded-full absolute right-0 h-full w-full items-center justify-center px-6 hidden group-hover:flex">
                <UilTrashAlt className="text-bold group-hover:text-white" />
            </div>
        </div>
    );
}
 
export default Item;