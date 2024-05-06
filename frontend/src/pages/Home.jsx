import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
import { useContext, useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { userInf } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userInf');
        navigate(0);
    }
    return <>
        <h1>Home</h1>
        <h2>Hi, {userInf.username}!</h2>
        <button onClick={handleLogout}>Logout</button>
        {
            userInf.role === 3 ? <button onClick={() => navigate('/secret')}>Go To Secret</button> : null
        }
    </>
};


export default Home;