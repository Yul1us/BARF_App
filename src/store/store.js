//Configurando Redux - applyMiddleware
//https://www.npmjs.com/package/redux-thunk
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'


import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
});


//Configurando Redux
//https://github.com/zalmoxisus/redux-devtools-extension#usage
// export const store = createStore( 
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//      );


export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
     );