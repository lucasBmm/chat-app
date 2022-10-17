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
import { useAlert } from 'react-alert';
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react/dist/types/exposedTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh as icon } from '@fortawesome/free-solid-svg-icons';

export const Input: React.FC = (): JSX.Element => {
    const [ text,   setText   ] = useState("");
    const [ file,   setFile   ] = useState<any>();
    const [ emoji,  setEmoji  ] = useState(false);
    const alert = useAlert();

    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
      if (file) {
          const storageRef = ref(storage, uuid());

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

    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
      setText(prev => prev + emojiData.emoji); 
    }

    return (
        <div className='input'>
          <button className='emoji-btn' onClick={() => setEmoji(!emoji)}> <FontAwesomeIcon icon={icon} className="emoji-icon" /> </button>
            {emoji &&
              <div className="emoji-container" onClick={() => setEmoji(false)}>
                <EmojiPicker theme={Theme.DARK} onEmojiClick={onEmojiClick}  autoFocusSearch={false} /> 
              </div> 
            }
            <input type="text" placeholder='Type something...' value={text} onChange={(e) => setText(e.target.value)} />
            <div className="send">
                <input type="file" style={{display: 'none'}} id="file" onChange={(e) => setFile(e.target?.files)}/>
                <label htmlFor="file">
                    <img src='/images/img.png' />
                </label>
                <button 
                  onClick={handleSend} 
                  style={{display: text ? 'block' : 'none'}}
                >
                  Send
                </button>
            </div>
        </div>
    )
}