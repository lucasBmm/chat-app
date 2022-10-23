import React, { useContext } from 'react';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import { DefaultChat } from './default-chat';

export const Chat: React.FC = (): JSX.Element => {
    const { data, dispatch } = useContext(ChatContext);

    const handleClick = (): void => {
        dispatch({type: "CLOSE_CHAT", payload: null});
    }

    return (
        <div className={`chat ${data.chatId ? 'opened' : ''}`}>
            {data?.chatId && 
            <>
                <div className="chat-info">
                    <div className="chat-back">
                        <button className='back-btn' onClick={handleClick}> &#8592; </button>
                        <img src={data?.user.photoURL} alt="user image" className='user-image' />
                        <span>{ data?.user?.displayName }</span>
                    </div>
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