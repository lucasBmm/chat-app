import React from 'react';

export const Message: React.FC = (): JSX.Element => {
    return (
        <div className='message owner'>
            <div className="message-info">
                <img src="/images/userImage.jpg" alt="user image" />
                <span>just now</span>
            </div>
            <div className="message-content">
                <p>hello</p>
                <img src="/images/userImage.jpg" alt="" />
            </div>
        </div>
    )
}