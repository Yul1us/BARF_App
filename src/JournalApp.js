import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter';

export const JournalApp = () => {
    return (
        // <div>
        //     <h1>Journal App</h1>
            
        // </div>
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    );
};
