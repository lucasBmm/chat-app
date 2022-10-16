import React, { ReactElement, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { Error, ILogin } from '../../models/models';
import { authErrors } from '../../models/error';

const LOGIN_INITIAL_VALUE: ILogin = {
    email: "",
    password: "",
}

const ERROR_INITAL_VALUE: Error = { 
    hasError: false, 
    errorMessage: ""
}

export const Login: React.FC = (): ReactElement => {
    const [ error, setError ]   = useState<Error>(ERROR_INITAL_VALUE);
    const navigate              = useNavigate();
    const [ login, setLogin ]   = useState<ILogin>(LOGIN_INITIAL_VALUE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, login.email, login.password)
            navigate("/");
        } catch (error: any) {
            setError({
                hasError: true,
                errorMessage: error?.code?.replace("auth/", "")
            });
        }
    }

    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat App</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"     
                        placeholder='Email'
                        name="email"
                        onChange={e => handleChange(e)}
                        value={login.email}
                    />

                    <input 
                        type="password"  
                        placeholder='Password'  
                        name="password" 
                        onChange={e => handleChange(e)} 
                        value={login.password} 
                    />

                    <button type='submit'>Sign in</button>
                    {error?.hasError && <span className='error-message'>{authErrors[error.errorMessage]}</span>}
                </form>
                <p>You don't have an account already? <Link to="/register"> Register </Link></p>
            </div>
        </div>
    )
}