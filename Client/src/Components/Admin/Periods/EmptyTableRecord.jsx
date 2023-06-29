const EmptyRecord = () => {
    return (
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
            <td className="px-6 py-4">----</td>
            <td className="px-6 py-4">----</td>
        </tr>
    );
} 

export default EmptyRecord;