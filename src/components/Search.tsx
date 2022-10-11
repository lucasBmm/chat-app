import React, { useState } from 'react';
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const Search: React.FC = (): JSX.Element => {
    const [ username, setUsername ] = useState<string>("");
    // FIXME: ADD CORRECT TYPES TO USER
    const [ user    , setUser     ] = useState<any>();
    const [ err     , setErr      ] = useState<boolean>(false);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && handleSearch();
    }

    return (
        <div className='search'>
            <div className="search-form">
                <input 
                    type="text" 
                    placeholder='Find a user' 
                    onKeyDown={handleKey}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            {err && <span>Something went wrong!</span>}
            {user && <div className="user-chat">
                <img src={user.photoURL} alt="" />
                <div className="user-chat-info">
                    <span>{ user.displayName }</span>
                    <p>Hello</p>
                </div>
            </div>}
        </div>
    )
}