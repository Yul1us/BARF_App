import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch(activeNote);

    //usar useSelector, para traer las notas, y traer la activa
    //renombre el estado active:note
    const{ active:note} = useSelector( state => state.notes );
    //muestra por consola la nota activa
    // console.log(active)
    // console.log(note)

    //Le envíamos useForm( note ) 
    //para extraer: body, title, del formValues
    const [formValues, handleInputChange, reset] = useForm( note );
    // console.log(formValues);
    const { body, title, id } = formValues;


    //aca se va a resetear el useForm, para que no cree un ciclo infinito
    //ojo, para lograr esto, se modifico el reset del useForm
    const activeId = useRef ( note.id );
    useEffect(() => {
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }
    }, [note, reset])
    

    //Para que cuando algo cambia en la nota, capturar esos cambios...
    //luego que esten capturados, enviarlo a firebase...
    //con el boton save
    useEffect(() => {
        //console.log(formValues);
        dispatch( activeNote( formValues.id, {...formValues} ) );
    }, [formValues, dispatch])
    

const handleDelete = () => {
    console.log(id);
    dispatch( startDeleting( id ) );
}


  return (
    <div className='notes__main-content'> 
        {/* NoteScreen */}

        <NoteAppBar />

        <div className='notes__content'>
            <input
                className='notes__title-input'
                type='text'
                placeholder='Some awersome title'
                autoComplete='off'
                name='title'
                value={title}
               
                //Funcion para manejar el cambio
                onChange={handleInputChange}
            />
            <textarea
                placeholder='What happened today'
                className='notes__textarea'
                name='body'
                value={body}
                
                //Funcion para manejar el cambio
                onChange={handleInputChange}
                
            ></textarea>


            {    
                //mostrar de manera condicional esta imagen con (note.url) &&() si existe...
                (note.url)
                &&(
                    <div className='notes__image'>
                        <img 
                            // src='https://static5.depositphotos.com/1013513/502/i/950/depositphotos_5021225-stock-photo-beautiful-morning-at-spring-before.jpg'
                            // src='https://cdn.photography-secret.com/1943706/These_Inspiring_Landscape_Photographers_will_Make_You_Want_to_Take_Better_Photos_2.jpg.webp'
                            src={note.url}
                            alt='Imagen'
                        />

                    </div>
                )
            }

        </div>

        <button 
            className='btn btn-danger'
            onClick={handleDelete}
        >
            Delete
        </button>

    </div>
  )
}
