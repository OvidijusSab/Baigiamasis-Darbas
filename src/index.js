import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { CardsProvider } from './components/contexts/CardsContext';
import { UsersProvider } from './components/contexts/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

    <BrowserRouter>
        <CardsProvider>
            <UsersProvider>
                <App />
            </UsersProvider>
        </CardsProvider>
    </BrowserRouter>
);
