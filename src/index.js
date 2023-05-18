import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './contexts/QuestionsContext';
import { UsersProvider } from './contexts/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
        <QuestionsProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QuestionsProvider>
    </UsersProvider>
);