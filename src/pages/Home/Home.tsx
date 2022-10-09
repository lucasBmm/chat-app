import React from 'react';
import { Chat } from '../../components/Chat';
import { Sidebar } from '../../components/Sidebar';
import './Home.scss';

export const Home: React.FC = (): JSX.Element => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}