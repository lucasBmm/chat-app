import React from 'react';

export const Search: React.FC = (): JSX.Element => {
    return (
        <div className='search'>
            <div className="search-form">
                <input type="text" placeholder='Find a user'/>
            </div>
            <div className="user-chat">
                <img src="/images/userImage.jpg" alt="" />
                <div className="user-chat-info">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}