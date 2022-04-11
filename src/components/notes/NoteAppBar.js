import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NoteAppBar = () => {

  const dispatch = useDispatch ();
  //extrae del store la nota activa, con el useSelector
  const {active} = useSelector( state => state.notes );
  //Formatear la fecha para mostrarla
   const noteDate = moment(active.date).format('MMMM Do YYYY, h:mm:ss a');
  
  const handleSave = () => {
    console.log(active);
    dispatch (startSaveNote( active ));
    
  }


  const handlePictureClick = () => {
    console.log('picture click');
    //para seleccionar demtro de la pagina un elemento
    //simula un click
    document.querySelector('#fileSelector').click();
  }


const handleFileChange = (e) =>{
  // console.log('Cambio en el archivo:' , e);
  //selecciona solo el archivo
  // console.log('Cambio en el seleccion:' , e.target);
  console.log('Archivo:' , e.target.files);
  const file = e.target.files[0];
  //si se tiene una imagen
  if ( file ) {
    dispatch(startUploading(file));
  }

}
// 
  return (
    <div className='notes_appbar'>
      {/* <span>28 Agosto 2020</span> */}
      
      <span>{noteDate}</span>
        <input
        //identificador
        id='fileSelector'
        //te permite escojer un archivo...
          type='file'
          //target -> name='file'
          name='file'
          //Para que no se vea..
          style={{ display: 'none' }}
          //para controlar los cambios
          onChange={ handleFileChange }
        />
        <div>
            <button 
              className='btn'
              onClick={ handlePictureClick }
            >
                Picture
            </button>
            <button 
              onClick={ handleSave }
              className='btn'
            >
                Save
            </button>
        </div>
    </div>
    
  )
}
