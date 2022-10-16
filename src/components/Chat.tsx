import React, { useContext } from 'react';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import { DefaultChat } from './default-chat';

export const Chat: React.FC = (): JSX.Element => {
    const { data } = useContext(ChatContext);

    return (
        <div className='chat'>
            {data?.chatId && 
            <>
                <div className="chat-info">
                    <span>{ data?.user?.displayName }</span>
                    <div className="chat-icons">
                        <img src="/images/cam.png" alt="" />
                        <img src="/images/add.png" alt="" />
                        <img src="/images/more.png" alt="" />
                    </div>
                </div>
                <Messages />
                <Input    />
            </>}
            {!data?.chatId &&
                <DefaultChat />
            }
        </div>
    )
}