import React, { useState, useContext } from 'react';
import { collection, DocumentData, getDocs, query, where, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';
import { AuthContext } from './../context/AuthContext';

export const Search: React.FC = (): JSX.Element => {
    const [ username, setUsername ] = useState<string>("");
    // FIXME: ADD CORRECT TYPES TO USER
    const [ user    , setUser     ] = useState<any>();
    const [ err     , setErr      ] = useState<boolean>(false);

    const currentUser = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (!doc.data()) return;
                setUser(doc.data());
            });
        } catch (err) {
            console.log()
            setErr(true);
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        if (currentUser && user) {
            const combinedId =  currentUser.uid > user.uid 
                ? currentUser.uid + user.uid 
                : user.uid + currentUser.uid;
            try {
                const response = await getDoc(doc(db, "chats", combinedId));

                if(!response.exists()) {
                     //create a chat in chats collection
                    await setDoc(doc(db, "chats", combinedId), { messages: [] });

                   //create user chats
                    await setDoc(doc(db, "userChats", currentUser.uid), {
                        ["userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        },
                        ["date"]: serverTimestamp(),
                    });
            
                    await setDoc(doc(db, "userChats", user.uid), {
                        ["userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        },
                        ["date"]: serverTimestamp(),
                    });
                }
            } catch (err) {
                console.error(err)
                setUsername("");
                setUser(null);
            }
        }
    }

    return (
        <div className='search'>
            <div className="search-form">
                <input 
                    type="text" 
                    placeholder='Find a user' 
                    onKeyDown={handleKey}
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="user-chat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>{ user.displayName }</span>
                        <p>Hello</p>
                    </div>
                </div>
            )}
        </div>
    )
}