import React, { ReactElement } from 'react';
import './Login.scss'

export const Login: React.FC = (): ReactElement => {
    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat App</span>
                <span className="title">Login</span>
                <form>
                    <input type="email"     placeholder='Email'         />
                    <input type="password"  placeholder='Password'      />
                    <button>Sign in</button>
                </form>
                <p>You don't have an account already? <a href="#"> Register </a></p>
            </div>
        </div>
    )
}