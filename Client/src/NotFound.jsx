import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
    <div className='h-full w-full flex flex-col justify-center items-center bg-slate-600'>
      <div className='min-w-fit w-1/2 flex flex-col gap-3 items-center bg-white rounded-lg py-6'>
        <h1 className='text-3xl font-normal'>404 - Page Not Found</h1>
        <p className='text-lg'>The page you are looking for does not exist.</p>
        <button className='border-2 border-black rounded-full py-2 px-10 text-center hover:bg-indigo-300 hover:text-rose-600 hover:font-bold'>
          <Link to='/' className='block w-full h-full'>
            Go to home
          </Link>
        </button>
      </div>
    </div>
    );
};

export default NotFound;
