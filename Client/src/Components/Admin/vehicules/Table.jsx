import Search from "../users/Search";

const Table = () => {
  return (
    <div className="col-span-3 bg-indigo-50 rounded-2xl drop-shadow-lg p-5 flex flex-col gap-5">
      <div className="flex items-center justify-center py-2">
        <span className="border-2 border-gray-700 text-gray-700 text-2xl font-bold py-1 px-10 rounded-full">
          Regular
        </span> 
      </div>

      <div className="flex items-center justify-between py-4 px-5 rounded-lg bg-white dark:bg-gray-800 ">
        <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-emerald-500 ">
          Add a New Vehicule
        </button> 
        
        <Search />
      </div>



      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input type="checkbox" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>
            </td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div className="pl-3">
                <div className="text-base font-semibold">bhsdgbsdfgsdf</div>
                <div className="font-normal text-gray-500">
                  sdfgsdfg@dfgsdfg.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">sdfqs</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                Offline
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                href="#"
                type="button"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
              >
                Edit
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
