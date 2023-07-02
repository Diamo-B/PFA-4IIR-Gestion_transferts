const EmptyRecord = () => {
    return (
        <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 capitalize ">
            <th scope="row" className="px-6 py-8" colSpan={6}>
                No Periods Were Found
            </th>
        </tr>
    );
} 

export default EmptyRecord;