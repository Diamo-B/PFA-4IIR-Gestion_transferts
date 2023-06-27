const Table = () => {
  return (
    <>
      <table className="w-full text-gray-500 relative text-center">
        <thead className=" text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-40">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              N° Places
            </th>
            <th scope="col" className="px-6 py-3">
              luxe
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
            <th className="w-4 p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  disabled={true}
                />
              </div>
            </th>
            <th scope="row" className="px-6 py-4">
              ----
            </th>
            <td className="px-6 py-4">----</td>
            <td className="px-6 py-4">----</td>
            <td className="px-6 py-4">
              <label className="relative top-1 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  disabled={true}
                />
                <div className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-center gap-3">
                <button className="font-bold">----</button>
                <button className="font-bold">----</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
