import React from 'react';
import { useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from './../context/AuthContext';
import { Timestamp } from 'firebase/firestore';

interface Props {
    message: {
        id: string,
        text: string,
        senderId: string,
        date: {
            seconds: number,
            nanoseconds: number
        },
        img?: string
    }
}

export const Message: React.FC<Props> = ({message}: Props): JSX.Element => {
    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef<any>();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, [message])

    const convertTime = (): string => {
        let convertedDate = new Date(message.date.seconds*1000).toLocaleTimeString().substring(0, 5);

        return convertedDate;
    }

    return (
        <div
            ref={ref} 
            className={`message ${message?.senderId === currentUser?.uid && "owner"}`}>
            <div className="message-info">
                <img src={
                    message?.senderId === currentUser?.uid
                        ? currentUser?.photoURL
                        : data?.user?.photoURL
                    } 
                    />
                <span>{ convertTime() }</span>
            </div>
            <div className="message-content">
                {message?.text && <p>{message?.text}</p>}
                { message?.img && <img src={message.img} />}
            </div>
        </div>
    )
}