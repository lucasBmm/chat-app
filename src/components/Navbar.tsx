import React from 'react';

export const Navbar: React.FC = (): JSX.Element => {
    return (
        <div className='navbar'>
            <span className="logo">Chat App</span>
            <div className="user">
                <img src="/images/userImage.jpg" alt="" />
                <span>John</span>
                <button>logout</button>
            </div>
        </div>
    )
}