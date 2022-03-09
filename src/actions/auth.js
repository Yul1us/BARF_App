import Swal from 'sweetalert2'

import {firebase, googleAuthProvider} from '../firebase/firebase-config'
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

//Funcion de javascript que retorna un callback
// export const startLoginEmailPassword = (email, password) => {
//     return ( dispatch ) => {
//         //proceso asincrono
//         setTimeout(() => {
            
//             dispatch(login(123,'pedro'));

//         }, 3000);

//     }
// }

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        dispatch( startLoading() );


        firebase.auth().signInWithEmailAndPassword (email, password)
        // user.uid, user.displayName vienen del objeto que se obtiene de google...
        .then( ({ user }) => {
            console.log(user);
            dispatch(login( user.uid, user.displayName ));

            dispatch(finishLoading());
        } )
        .catch( e =>{
            //Algo salio mal...
            console.log(e);
            dispatch(finishLoading());
            //https://sweetalert2.github.io/#examples
            Swal.fire('Error: algo salio mal', e.message, 'error')
        })

    }
}

//Autenticacion con google en firebase
export const startGoogleLogin = (email, password) => {
    return ( dispatch ) => {
        
        //coloca la ventana de goole para pedir el privider
        //esto retorna una promesa
        firebase.auth().signInWithPopup( googleAuthProvider )
        // user.uid, user.displayName vienen del objeto que se obtiene de google...
        .then( ({ user }) => {
            console.log(user);
            dispatch(
                login( user.uid, user.displayName )

            );
        } )

    }
}




export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};


// Para el formulario del Register
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
       
        firebase.auth().createUserWithEmailAndPassword( email, password )
        // user.uid, user.displayName vienen del objeto que se obtiene de firabase...
            .then( async ({ user }) => {
                await user.updateProfile( { displayName: name } );
                console.log(user);
                dispatch(
                    login( user.uid, user.displayName )

                );
            })
            .catch( e =>{
                console.log(e);
                //https://sweetalert2.github.io/#examples
                Swal.fire('Error: algo salio mal', e.message, 'error')
            })

    }
};


//Logout Firebase, se llama en el Sidebar
export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout () );
        //despues de hacer logout, pulgamos es store de las notas
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})


