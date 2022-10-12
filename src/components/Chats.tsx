import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { db } from './../firebase';
import { AuthContext } from './../context/AuthContext';
import { Unsubscribe } from 'firebase/auth';

export const Chats: React.FC = (): JSX.Element => {

    const [ chats, setChats ] = useState<any[]>([]);

    const currentUser = useContext(AuthContext);

    useEffect(() => {
        let unsub!: Unsubscribe;
        
        const getChats = () => {
            console.log("get chats")
            if (!currentUser) return;
            unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                if (doc) {
                    setChats(prev => [doc.data()]);
                    console.log(chats)
                }
            })

            return () => {
                unsub();
            }
        };
        
        
        getChats();

    }, [currentUser?.uid])

    return (
        <div className='chats'>
            {Object.entries(chats)?.map((chat: any) => (
                <div className="user-chat" key={chat[0]}>
                    <img src={chat[1]?.userInfo?.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>
                            {chat[1]?.userInfo?.displayName}
                        </span>
                        <p>{chat[1]?.userInfo?.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}