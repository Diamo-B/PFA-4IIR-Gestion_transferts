import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();

    let logout = () => {
        localStorage.removeItem("jwt");
        Cookies.remove('userType');
        navigate('/login');
    }
    return ( 
        <button className="btn capitalize"
            onClick={logout}
        >
            logout
        </button>
    );
}
 
export default Logout;