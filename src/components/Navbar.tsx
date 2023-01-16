import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from './../context/AuthContext';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = (): JSX.Element => {
    const user = useContext(AuthContext);
    const [ cookies, useCookie, removeCookie ] = useCookies(["user"]);
    const navigate = useNavigate();

    const logout = (): void => {
        signOut(auth);
        removeCookie("user");
        navigate("/login")
    }

    console.log(user?.photoURL)

    return (
        <div className='navbar'>
            <span className="logo">Chat App</span>
            <div className="user">
                <img src={user?.photoURL || '/images/default-user-img.webp'} alt="user profile picture" />
                <span>{ user?.displayName ?? ''}</span>
                <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}