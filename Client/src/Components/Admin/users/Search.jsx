import {UilSearch} from "@iconscout/react-unicons";
import { useState } from "react";
import {setFetchingType} from '../../../Redux/Admin/UsersPanel';
import {useDispatch} from 'react-redux'


const Search = () => {
    let [searchTerm, setSearchTerm] = useState("");
    const dispatcher = useDispatch();
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if(searchTerm === "")
                dispatcher(setFetchingType("all"))
            else
                dispatcher(setFetchingType(searchTerm))
        }

    };
    return (
        <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                <UilSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
                type="text"
                className="block p-2 pl-10 text-sm text-gray-900 border rounded-lg w-80 bg-gray-50"
                placeholder="Search by first name, last name or email"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Search;
