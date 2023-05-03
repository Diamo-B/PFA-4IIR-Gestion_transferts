import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import { UilSignout } from "@iconscout/react-unicons";

const logout = ({classNames}) => {
    const navigate = useNavigate();
    
    let logout = () => {
        localStorage.removeItem("jwt");
        Cookies.remove('userType');
        navigate('/login');
    }
    return ( 
        <button onClick={logout}>
          <UilSignout className={classNames.join(' ')}/> {/* log out */}
        </button>
    );
}
 
export default logout;