import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { db } from './../firebase';
import { AuthContext } from './../context/AuthContext';
import { Unsubscribe } from 'firebase/auth';
import { ChatContext } from '../context/ChatContext';

export const Chats: React.FC = (): JSX.Element => {

    const [ chats, setChats ] = useState<any[]>([]);

    const currentUser = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            if (!currentUser) return;
            let unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                if (doc) {
                    setChats([doc.data()]);
                }
            })

            return () => {
                unsub();
            }
        };
        
        
        currentUser?.uid && getChats();

    }, [currentUser?.uid])

    const handleSelect = (userInfo: any) => {
        dispatch({type: "CHANGE_USER", payload: userInfo});
    }

    return (
        <div className='chats'>
            {chats[0] && Object.entries(chats)?.sort((a, b )=> a[1].date = b[1].date)?.map((chat: any) => (
                <div className="user-chat" key={chat[0]} onClick={() => handleSelect(chat[1]?.userInfo)}>
                    <img src={chat[1]?.userInfo?.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>
                            {chat[1]?.userInfo?.displayName}
                        </span>
                        <p>{chat[1]?.lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}