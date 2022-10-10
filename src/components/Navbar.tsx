import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from './../context/AuthContext';

export const Navbar: React.FC = (): JSX.Element => {
    const user = useContext(AuthContext);

    return (
        <div className='navbar'>
            <span className="logo">Chat App</span>
            <div className="user">
                <img src={user?.photoURL ?? ''} alt="user profile picture" />
                <span>{ user?.displayName ?? 'John Doe'}</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}