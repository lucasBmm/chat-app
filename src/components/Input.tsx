import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from './../firebase';
import { v4 as uuid } from 'uuid';
import { ref } from 'firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

export const Input: React.FC = (): JSX.Element => {
    const [ text,   setText ] = useState("");
    const [ file,   setFile  ] = useState<any>();

    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
      if (file) {
          const storageRef = ref(storage, uuid());

          const uploadTask = uploadBytesResumable(storageRef, file[0]);

          await uploadBytesResumable(storageRef, file[0]).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser?.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            })
          });
      } else {
        if (!data.chatId) return;
        await updateDoc(doc(db, "chats", data?.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
            })
        })
      }

      if (!currentUser) return;
      await updateDoc(doc(db, "userChats", currentUser?.uid), {
        ["lastMessage"]: {
          text
        },
        ["date"]: serverTimestamp()
      });

      await updateDoc(doc(db, "userChats", data?.user?.uid), {
        ["lastMessage"]: {
          text
        },
        ["date"]: serverTimestamp()
      });

      setText("");
      setFile(null);
    }

    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} value={text}/>
            <div className="send">
                <img src="/images/attach.png" alt="" />
                <input type="file" style={{display: 'none'}} id="file" onChange={e => setFile(e?.target?.files)} />
                <label htmlFor="file">
                    <img src='/images/img.png' />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}