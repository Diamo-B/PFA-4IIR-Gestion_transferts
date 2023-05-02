import Navbar from "../Components/Admin/Navbar";
const AdminLayout = ({children}) => {
  return (
    <div className="w-full h-full bg-indigo-200 dark:bg-gray-900 text-white">
        <div className="w-full h-full flex">
          <Navbar/>
          <div className="flex-1 py-3">
            {
              children
            }
          </div>
        </div>
    </div>
  );
};

export default AdminLayout;
