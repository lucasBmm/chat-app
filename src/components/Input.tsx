import React from 'react';

export const Input: React.FC = (): JSX.Element => {
<<<<<<< Updated upstream
=======
    const [ text,   setText ] = useState("");
    const [ file,   setFile  ] = useState<any>();

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

>>>>>>> Stashed changes
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' />
            <div className="send">
                <img src="/images/attach.png" alt="" />
                <input type="file" style={{display: 'none'}} id="file" />
                <label htmlFor="file">
                    <img src='/images/img.png' />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}