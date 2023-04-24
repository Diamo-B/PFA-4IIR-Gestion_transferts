import './App.css';
import ChoixTraget from './Components/Departure_Arrival/ChoixTraget';

const Home = () => {
  return ( 
      <div id='topLevel' className='bg-slate-500 flex flex-col min-h-screen'>
      <div className='h-10'>

      </div>

      <div className='flex-grow flex flex-col justify-center items-center'> 
        <ChoixTraget />
      </div>

      <div className='h-10'>

      </div>
      
    </div>
  );
}
 
export default Home;