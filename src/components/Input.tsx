import React from 'react';

export const Input: React.FC = (): JSX.Element => {
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