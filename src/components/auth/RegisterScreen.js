import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';



export const RegisterScreen = () => {


    
    /*
        datos que va a tener el formulario de registro
        {
            name: 'Julio Aguero',
            email: 'julioa@laideatech.net',
            password: '123456',
            password2: '123456'
        }

        //useForm

        const handleRegister = (e) {
            e.preventDefault();
            console.log(name, email, password, password2)

        }
     */

    const dispatch = useDispatch ();
    const {msgError} = useSelector( state => state.ui ); 
    // const state = useSelector( state => state.ui );
    // console.log(state);
    console.log(msgError);

    const [formValues, handleInputChange ] = useForm({
        // name: 'Julio Aguero',
        // email: "julioa@laideatech.net",
        // password: '123456',
        // password2: '123456',
      name: '',
        email: "",
        password: '',
        password2: '',
    });
    
    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {
        //evitar la propagación del formulario
        e.preventDefault(); 
        console.log(name, email, password, password2);

        if (isFormValid ()) {
            // console.log('Formulario validado')
            dispatch( startRegisterWithEmailPasswordName (email, password, name) );
        }

        // dispatch(startRegisterUser(email, password));


    }

    const isFormValid = () => {

        //validacion #1: no escribio el nombre
        if ( name.trim().length===0 ) {
            console.log('Name is require')
            dispatch(setErrorAction('Name is require'));
            return false;

        } else if ( !validator.isEmail( email ) ) {
            console.log('Email is not valid');
            dispatch(setErrorAction('Email is not valid'));
            return false;
        } else if ( password.trim().length < 5 || password !== password2  ) {
            console.log('Password should be al least 6 characters and math each other');
            dispatch(setErrorAction('Password should be al least 6 characters and math each other'));
            return false;
        }

        dispatch ( removeErrorAction() );
        return true;

    }

    return (
        // <div>
        //     <h1>Register Screen</h1>
        // </div>

        <>
            <h3 className='auth__tittle'>Register</h3>
            <form 
                onSubmit={handleRegister}
                //animaciones
                className='animate__animated animate__fadeIn animate__faster'
            >

                {/* mensaje aparece de manera condicional */}
                {
                    msgError && 
                    (
                        <div className='auth__alert-error'>
                            {/* Por favor revisar los datos del registro... */}
                            {msgError}
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off' //Evita que salgan las sugerencias de los correos
                    value={name}
                    onChange = { handleInputChange }
                />
                <input 
                    type="text"
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off' //Evita que salgan las sugerencias de los correos
                    value={email}
                    onChange = { handleInputChange }
                />

                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange = { handleInputChange }
                />
                {/* Validar Password */}
                 <input 
                    type="password"
                    placeholder='Confirm password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange = { handleInputChange }
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block  mb-5'
                    // disabled={true}
                >
                    Register
                </button>
                
               <Link  
                    to="/auth/login"
                    className='link'
                >
                    Already register?
               </Link> 

            </form>
        </>
    );
};
