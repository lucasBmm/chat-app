import React, { useState, useContext } from 'react';
import { collection, DocumentData, getDocs, query, where, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';
import { AuthContext } from './../context/AuthContext';
import { useAlert } from 'react-alert';

export const Search: React.FC = (): JSX.Element => {
    const [ username, setUsername ] = useState<string>("");
    // FIXME: ADD CORRECT TYPES TO USER
    const [ user    , setUser     ] = useState<any>();
    const [ err     , setErr      ] = useState<boolean>(false);
    const alert = useAlert();


    const currentUser = useContext(AuthContext);

    const handleSearch = async () => {
        if (currentUser?.displayName == username) {
            alert.error("You can't search yourself!");
            return;
        }

        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setErr(true);
                return;
            } else {
                querySnapshot.forEach((doc) => {
                    if (!doc.data()) {
                        setErr(true)
                        return
                    };
                    setUser(doc.data());
                });
            }
        } catch (err) {
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

                    const thisUserChats = await getDoc(doc(db, "userChats", currentUser.uid));
                    const userChats = await getDoc(doc(db, "userChats", user.uid));

                    let updateOrSet: Function;

                    if (!thisUserChats.exists()) {
                        await setDoc(doc(db, "userChats", currentUser.uid), {});
                    }

                    if (!userChats.exists()) {
                        await setDoc(doc(db, "userChats", user.uid), {});
                    }

                    // if (userChats.exists()) {
                    //     updateOrSet = updateDoc;
                    // } else {
                    //     updateOrSet = setDoc;
                    // }

                   // create user chats if
                    await updateDoc(doc(db, "userChats", currentUser.uid), {
                        [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });
            
                    await updateDoc(doc(db, "userChats", user.uid), {
                        [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });
                }
            } catch (err) {
                alert.error("Error")
            }
            setUsername("");
            setUser(null);
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
            {err && <span style={{"color": "white"}}>User not found!</span>}
            {user && (
                <div className="user-chat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>{ user.displayName }</span>
                    </div>
                </div>
            )}
        </div>
    )
}