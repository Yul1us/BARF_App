
/*
    {
        uid: Q#$jdg46,
        name: 'Julio'

    }
*/


import { types } from "../types/types";

// const InitialState = {
//     uid: 9875346,
//     name: 'Julio',
//     Direcion: {
//         Locate: 'Urb. Valle Hondo'
//     }
// }

// export const authreducer = (state =InitialState, action) => {


export const authReducer = (state ={}, action) => {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return { }  //Retorna un objeto vacio, lo cual borra los valores existentes
        
        default:
            return state;
        }
} 