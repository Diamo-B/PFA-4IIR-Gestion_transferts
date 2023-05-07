const TableCard = ({ title, children }) => {
    return (
        <>
            <h1 className="font-medium text-white text-2xl text-center">{title}</h1>
            <div className="border-2 bg-white border-gray-200 shadow-md rounded-full flex justify-center mt-5 w-5/6 mx-auto py-5">
                {children}
            </div>
        </>
    );
};

export default TableCard;
