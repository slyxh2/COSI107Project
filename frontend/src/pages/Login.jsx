import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { postLogin } from '../api';
import './page.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(username, password);
        postLogin(username, password).then((response) => {
            if (!response.error) {
                console.log(response);
                const { access_token, refresh_token, user } = response;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('userInf', JSON.stringify(user));
                navigate(0);
            }
        })
    }

    return <>
        <h1>COSI107 Project</h1>
        <div id='login_form_container'>
            <form onSubmit={handleLogin} id='login_form'>
                <label htmlFor="username"></label>
                <input type="text" name="username" id="username" placeholder='Please Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password"></label>
                <input type="text" name="password" id="password" placeholder='Please Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
        </div>
    </>
};

export default Login;