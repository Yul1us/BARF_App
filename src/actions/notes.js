import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpoload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

//https://cloudinary.com/
//upload_preset:
//react-journal
//api.cloudinary.com/v1_1/IDDETUCUENTA/upload
//api.cloudinary.com/v1_1/dckgitjcv/upload
//esta seria la url para subir nuevas images
//https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/upload
//API_SECRET: Ecl1fwIHF77EW0AE4NrHQ4WJvmU
//API_KEY: 128981965279236
//CLOUD_NAME: dckgitjcv
//si funciona:  "secure_url": "https://res.cloudinary.com/dckgitjcv/image/upload/v1646190554/oaxvxsh154e8gvbyur89.ico"

export const StartNewNote = () => {
    return async ( dispatch, getState ) => {
        
        //Esto imprime todo el estado de las variables globales
        // const state = getState();
        // console.log(state);

        //tambien se puede desestructurar
        //const uid = getState().auth.uid;

        //Esto imprime solo eluid el estado de las variables globales
        const {uid} = getState().auth;
        console.log(uid);

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime(),

        }

        //esto ingresa la nota en la base de datos: firestone
        //la variable db: referencia toda la base de datos.
        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);

        //informa al store cual es la nota selecionanda.
        dispatch( activeNote( doc.id, newNote ) );
        //carga la nota en el panes lateral y lo añade al store
        dispatch(addNewNote(doc.id, newNote));

    }
}

//acciones:
//Accion de activar la nota: activeNote
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});


export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }

});


export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        //como ya tenemos el uid del usuario, podemos mostrar sus notas...
        //con esta funcion
        const notes = await loadNotes(uid);
        //modificamos el state y agregamos las notas que estan dentro de la base de datos...
        //las cuales tenemos en memoria en la variable notes
        dispatch(setNotes( notes ))

    }
}


//Accion de cargar las nota: setNotes
export const setNotes = ( notes ) => ({

    type: types.notesLoad,
    payload: notes

});

//clase 275, gracias al midlerware y a thunk se disparan
export const startSaveNote = (note) => {
    return async ( dispatch, getState ) => {
        const {uid} = getState().auth;
        
        //si no viene el note.url, borrarlo
        if (!note.url){
            //elimina la propiedad id de note, ya que no la necesitamos
            delete note.url;
        }

        //hace un clon de la nota
        const noteToFirestore = { ...note };
        //elimina la propiedad id de note, ya que no la necesitamos
        delete noteToFirestore.id

        //ruta parea guardar los cambios
        //Q0PLi1OpLRXgUrgAJGFgEgxixiy2/journal/notes/409X2SfF99NDYH3kfQui
        //donde 'Q0PLi1OpLRXgUrgAJGFgEgxixiy2' es el Id del usuario: uid
        //donde '409X2SfF99NDYH3kfQui' es el Id de la nota -> note.id
        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );
        //console.log(noteToFirestore);

        //hay que actualizar la barra lateral con los cambios
        //esto es muy pesado, ya que el 99% de la informacion esta igual...
        //solo cambio una nota
        // dispatch(startLoadingNotes(uid));

        //version 2

        dispatch( refreshNote(note.id, noteToFirestore) );
        //mostrar un mensaje para que el usuari sepa que se modifico
        //correctamente
        Swal.fire('Save',note.title, 'success');
    }
}

    //refrescar la nota localmente en la pantalla sin usar 
    //dispatch(startLoadingNotes(uid));
    export const refreshNote = (id, note) => ({
        type: types.notesUpdated,
        payload: {
            id, 
            note: {
                id, 
                ...note
            }
        }
    });

    //funcion para cargar la imagen seleccionada..
    //como es asincrona comenza por start
    //como es asincrona  tambien se debe usar thunk
    export const startUploading = ( file ) => {
        //como es asincrona  tambien se debe usar thunk
        return async( dispatch, getState ) => {
            //del store, sacamos el estado de la nota activa, se renombro por: activeNote
            const { active: activeNote } = getState().notes
            console.log(file);
            //console.log(activeNote);//a esta nota activa se le quiere modificar la propiedad -> url
            //luego se debe subir la imagen o el archivo a cloudinary
            //api.cloudinary.com/v1_1/dckgitjcv/upload
            
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
                
            });

            const fileUrl = await fileUpoload(file);
            console.log('Se almaceno en: ', fileUrl);

            activeNote.url = fileUrl;
            dispatch( startSaveNote( activeNote ) )

            Swal.close();

        }  
    }

    export const startDeleting = (id) => {
        return async (dispatch, getState) => {
            const uid = getState().auth.uid;
            await db.doc(`${ uid }/journal/notes/${ id }`).delete();
            dispatch(deleteNote(id));

        };
    } 

    export const deleteNote = ( id ) => ({
        type: types.notesDelete,
        payload: id

    });

    //para cuando se hace logout
    //se deben pulgar todas las notas del store
    export const noteLogout = ( ) => ({
        type: types.notesLogoutCleaning

    })

    //notesLogoutCleaning