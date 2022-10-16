import React, { ReactElement, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { ILogin } from '../../models/models';
import { authErrors } from '../../models/error';
import { useAlert } from 'react-alert';

const LOGIN_INITIAL_VALUE: ILogin = {
    email: "",
    password: "",
}

export const Login: React.FC = (): ReactElement => {
    const navigate              = useNavigate();
    const [ login, setLogin ]   = useState<ILogin>(LOGIN_INITIAL_VALUE);
    const alert = useAlert();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, login.email, login.password)
            navigate("/");
        } catch (authError: any) {
            alert.error(authErrors[authError?.code?.replace("auth/", "")]);
        }
    }

    return (
        <div className="form-container login">
            <div className='form-wrapper'>
                <div className="top-text">
                    <span className="logo">Welcome Back!</span>
                    <span className="title">Sign in your account!</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"     
                        placeholder='Email'
                        name="email"
                        onChange={e => handleChange(e)}
                        value={login.email}
                        autoComplete="off"
                    />

                    <input 
                        type="password"  
                        placeholder='Password'  
                        name="password" 
                        onChange={e => handleChange(e)} 
                        value={login.password} 
                    />
                    <Link to="#" className='link'>Forgot password?</Link>

                    <button type='submit'>Sign in</button>
                </form>
                <p>Don't have an account already? <Link to="/register" className='link'>Sign Up</Link></p>
            </div>
        </div>
    )
}