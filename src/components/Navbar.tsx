import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';

export const Navbar: React.FC = (): JSX.Element => {
    return (
        <div className='navbar'>
            <span className="logo">Chat App</span>
            <div className="user">
                <img src="/images/userImage.jpg" alt="" />
                <span>John</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}