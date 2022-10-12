import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from './../context/AuthContext';

interface Props {
    message: string
}

export const Message: React.FC<Props> = ({message}: Props): JSX.Element => {
    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    return (
        <div className='message'>
            {/* <div className="message-info">
                <img src="/images/userImage.jpg" alt="user image" />
                <span>just now</span>
            </div>
            <div className="message-content">
                <p>hello</p>
                <img src="/images/userImage.jpg" alt="" />
            </div> */}
        </div>
    )
}