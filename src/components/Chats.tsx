import { onSnapshot, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import { db } from './../firebase';
import { AuthContext } from './../context/AuthContext';
import { Unsubscribe } from 'firebase/auth';

export const Chats: React.FC = (): JSX.Element => {

    const [ chats, setChats ] = useState([]);

    const currentUser = useContext(AuthContext);

    useEffect(() => {
        let unsub!: Unsubscribe;
        
        const getChats = () => {
            console.log("get chats")
            if (!currentUser) return;
            unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                console.log( doc.data())
            })

            return () => {
                unsub();
            }
        };
        
        console.log(currentUser)
        getChats();

    }, [currentUser?.uid])

    console.log(Object.entries(chats));

    return (
        <>
            <div className="user-chat">
                <img src="/images/userImage.jpg" alt="" />
                <div className="user-chat-info">
                    <span>
                        Jane
                    </span>
                </div>
            </div>
            <div className="user-chat">
                <img src="/images/userImage.jpg" alt="" />
                <div className="user-chat-info">
                    <span>
                        Jane
                    </span>
                </div>
            </div>
            <div className="user-chat">
                <img src="/images/userImage.jpg" alt="" />
                <div className="user-chat-info">
                    <span>
                        Jane
                    </span>
                </div>
            </div>
        </>
    )
}