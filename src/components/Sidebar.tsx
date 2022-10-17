import React from 'react';
import { Chats } from './Chats';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export const Sidebar: React.FC = (): JSX.Element => {
    const { data } = useContext(ChatContext);

    return (
        <div className={`sidebar ${data.chatId ? 'closed' : ''}`}>
            <Navbar />
            <Search />
            <Chats  />
        </div>
    )
}