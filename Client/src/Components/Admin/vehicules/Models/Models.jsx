import { UilPlus } from "@iconscout/react-unicons";
import Item from "./Item";

const Models = () => {
  return (
    <div className="bg-indigo-50 rounded-2xl shadow-lg py-5 px-2 text-gray-700 flex flex-col gap-5 overflow-y-auto">
        <div className="flex relative group">
            <div className="w-full text-base font-bold border-2 border-emerald-500 py-2 rounded-full text-center group-hover:cursor-pointer group-hover:bg-emerald-500 group-hover:text-white">
                Add New Model
            </div>
            <div className="border-2 border-emerald-500 rounded-full absolute right-0 h-full items-center px-5 hidden group-hover:flex group-hover:bg-white">
                <UilPlus className="text-bold group-hover:text-emerald-500" />
            </div>
        </div>

        <Item Text={"Regular"} />
        <Item Text={"MiniVan"} />
        <Item Text={"Van"} />
        <Item Text={"MiniBus"} />
        <Item Text={"Bus"} />
    </div>
  );
};

export default Models;
