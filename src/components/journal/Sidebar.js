import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { StartNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('Click Logout')
        dispatch ( startLogout () )
    }

    //con useSelector, buscamos en el state el usuario para colocarlo en la pantalla
    // const state = useSelector( state => state );
    // console.log(state); //verlo por consola para sacar lo que requiero...

    const {name} = useSelector( state => state.auth );
    console.log(name); //verlo por consola para sacar lo que requiero...

    //Manejando el Click de la creacion de una nota nueva:
    const handleAddNew = () => {
        dispatch( StartNewNote() );
    }

    return (
        // <div>Sidebar</div>
        // Barra de manu lateral
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    {/* Clases de: https://cdnjs.com/libraries/font-awesome */}
                    {/*<i className='far fa-moon'></i>*/}
                    <i class="fa fa-user" aria-hidden="true"></i>
                   {/*<i className="fa-thin fa-paw-simple"></i>*/}
                    {/* <i className="fa-thin fa-cat"></i>*/}
                  {/*<i className="fal fa-cat"></i>*/}
                    {/* <span> Julio </span> */}
                    <span> {name} </span>
                </h3>
                
                <button 
                    className='btn'
                    onClick= { handleLogout }
                >
      
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </button>
            </div>

            <div 
                className='journal__new_entry'
                onClick= { handleAddNew }
            >
                 {/* Clases de: https://cdnjs.com/libraries/font-awesome */}
                {/*<i className='far fa-calendar-plus fa-5x'></i>*/}
              <i className="fa-solid fa-dog  fa-5x"></i>
                {/*<p className='mt-5'>New entry</p*/}
                <p className='mt-5'>Nueva Mascota</p>
            </div>

            <JournalEntries />

        </aside>
    )
}
