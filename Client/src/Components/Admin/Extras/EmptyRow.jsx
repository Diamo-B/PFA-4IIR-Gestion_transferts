const EmptyRow = () => {
  return (
    <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 capitalize">
      <th className="w-4 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>
      </th>
      <td scope="row" className="px-6 py-5">
        ------
      </td>
      <td className="px-6 py-5 relative">------</td>
      <td className="px-6 py-5">------ MAD</td>
      <td className={`px-6 py-4`}>
        <div className="flex items-center gap-2 justify-center">
          <div className={`h-2.5 w-2.5 rounded-full bg-red-500`}></div>
          <p>Inactive</p>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex justify-center gap-3">
          <button className="font-bold hover:text-emerald-500">Activate</button>
          <button className="font-bold hover:text-amber-500">Update</button>
          <button className="font-bold hover:text-red-500">Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default EmptyRow;
