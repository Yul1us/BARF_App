import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {
    // const entries = [1,2,3,4,5,6,7,8,9,10]
    // const entries = [1,2,3,4,5]
    
    //vamos a usar useSelector para conseguir las notas en nuetra
    //fuente de la verdad que es el store
    const {notes} = useSelector( state => state.notes );


    return (
        <div className='journal__entries'>
            {/* JournalEntries */}

            {/* {
                entries.map( value => (
                    <JournalEntry key={ value } />
                ) )
            } */}



            {
                //barremos las notas -> notes
                //para mostrarlos en la pantalla del usuario
                notes.map( note => (
                    <JournalEntry 
                        key={ note.id } 
                        { ...note }
                    />
                ) )
            }


        </div>
  )
}
