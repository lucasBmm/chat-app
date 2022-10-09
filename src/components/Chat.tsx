import React from 'react';
import { Messages } from './Messages';
import { Input } from './Input';

export const Chat: React.FC = (): JSX.Element => {
    return (
        <div className='chat'>
            <div className="chat-info">
                <span>Jane</span>
                <div className="chat-icons">
                    <img src="/images/cam.png" alt="" />
                    <img src="/images/add.png" alt="" />
                    <img src="/images/more.png" alt="" />
                </div>
            </div>
            <Messages />
            <Input    />
        </div>
    )
}