/*
    {

        notes: [],
        actived: {
            id: '0975JHRG874543',
            title: '',
            body: '',
            imageUrl: '',
            date: 726534989654
        }

    }
*/

import { type } from "@testing-library/user-event/dist/type";
import { types } from "../types/types";


//Reducer es una funcion pura
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return {
                ...state,
                //action.payload -> es la nueva nota
                // y ...state.notes -> son las notas que ya existian...
                notes: [action.payload, ...state.notes]
            }


        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            //cambia solo la nota que coincida con el id de la nota activa
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }
        
        case types.notesDelete:
            //elimina solo la nota que coincida con el id de la nota activa
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }  
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []            
            }  

        default:
            return state;
    }
}