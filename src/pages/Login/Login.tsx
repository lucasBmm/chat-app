import React, { ReactElement, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

export const Login: React.FC = (): ReactElement => {
    const [ error, setError ]   = useState(false);
    const navigate              = useNavigate();

    // FIXME: Add the real event and state to each input
    const handleSubmit = async (e: any /*React.SyntheticEvent */): Promise<void> => {
        e.preventDefault();
        const email       = e.target[0].value;
        const password    = e.target[1].value;

        try {
            signInWithEmailAndPassword(auth, email, password);
            navigate("/");

        } catch {
            setError(true);
        }
    }
    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat App</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email"     placeholder='Email'         />
                    <input type="password"  placeholder='Password'      />
                    <button>Sign in</button>
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>You don't have an account already? <Link to="/register"> Register </Link></p>
            </div>
        </div>
    )
}