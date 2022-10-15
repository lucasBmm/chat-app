import React, { useContext, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Message } from './Message';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './../firebase';

export const Messages: React.FC = (): JSX.Element => {
    const [ messages, setMessages ] = useState<any[]>([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        console.log("Chamou o useEffect");
        console.log(data);

        if (data?.chatId) {
            const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
        
            return () => {
                unSub();
            };
        }

    }, [data.chatId]);

    return (
        <div className="messages">
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    )
}