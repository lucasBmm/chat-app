import React, { ReactElement } from 'react';
import './Register.scss'

export const Register: React.FC = (): ReactElement => {
    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
                <form>
                    <input type="text"      placeholder='Display Name'  />
                    <input type="email"     placeholder='Email'         />
                    <input type="password"  placeholder='Password'      />
                    <label htmlFor="file">
                        <img src="/images/addAvatar.png" alt="add avatar" />
                        <span>Add an avatar</span>
                    </label>
                    <input style={{display: 'none'}} type="file" id="file" placeholder='User Image' />
                    <button>Sign Up</button>
                </form>
                <p>You do have an account already? <a href="#"> Login </a></p>
            </div>
        </div>
    )
}