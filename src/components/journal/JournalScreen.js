import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {

    //usar useSelector para buscar en el store informacion global.
    //aca se requiere lo que tien la nota activa...
    const {active} = useSelector( state => state.notes );
    //esta es la nota que esta activa...
    //muy impoprtante para ejecutar acciones...
    console.log(active);

    return (
        <div 
            className='journal__main_content animate__animated animate__fadeInRightBig'
             //animaciones
            //  className='animate__animated animate__fadeIn animate__faster'
            
        >
            {/* <h1>Journal Screen</h1> */}
            <Sidebar />  

            <main>
                {/* <h1> Main Content </h1> */}
                {/* <NothingSelected /> */}
                {/* <NoteScreen /> */}
                {

                    (active)
                    ?   (<NoteScreen />)
                    :   (<NothingSelected />)
                }

            </main>
        </div>
    );
};
