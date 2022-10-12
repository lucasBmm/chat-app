import { AuthErrorCodes, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { ReactElement, useState } from 'react';
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Register.scss'
import { authErrors } from './../../models/error';

export interface Error {
    hasError: true | false,
    errorMessage: string
}

export interface AuthError {
    code: string
}

export const Register: React.FC = (): ReactElement => {

    const [ error, setError ]   = useState<Error>();
    const navigate              = useNavigate();

    // FIXME: Add the real event and state to each input
    const handleSubmit = async (e: any /*React.SyntheticEvent */): Promise<void> => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email       = e.target[1].value;
        const password    = e.target[2].value;
        const file        = e.target[3].files[0];

        try {
            const response =  await createUserWithEmailAndPassword(auth, email, password).then().catch((error: AuthError) => {
                console.log(error.code)
                setError({
                    hasError: true,
                    errorMessage: error.code.replace("auth/", "")
                })
            });

            if (!response) return;

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setError({
                        hasError: true,
                        errorMessage: error.code
                    });
                    console.log(error)
                },
                () => {
                    if (response?.user) return;
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(response.user, {
                            displayName,
                            photoURL: downloadURL
                        });

                        console.log('File available at', downloadURL);
                        await setDoc(doc(db, "users", response.user.uid), {
                                uid: response.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                        });

                        await setDoc(doc(db, "userChats", response.user.uid), {});
                        navigate("/");
                    });
                }
            );
        } catch {
            console.error(error);
        }
    }

    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text"      placeholder='Display Name'  />
                    <input type="email"     placeholder='Email'         />
                    <input type="password"  placeholder='Password'      />
                    <label htmlFor="file">
                        <img src="/images/addAvatar.png" alt="add avatar" />
                        <span>Add an avatar</span>
                    </label>
                    <input style={{display: 'none'}} type="file" id="file" placeholder='User Image' />
                    <button>Sign Up</button>
                    {error?.hasError && <span style={{color: 'red'}}>{authErrors[error.errorMessage]}</span>}
                </form>
                <p>You do have an account already? <Link to="/login"> Login </Link></p>
            </div>
        </div>
    )
}