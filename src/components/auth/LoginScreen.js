import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
// import { login } from '../../actions/auth';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';


export const LoginScreen = () => {
    const dispatch = useDispatch ();
    const {loading} = useSelector( state => state.ui ); //Solo se requiere de state.ui.loading

    const [formValues, handleInputChange ] = useForm({
        // email: 'julioa@laideatech.net',
        // password: '123456',
        email: '',
        password: '',
    });
    
    const { email, password } = formValues;
    
    // const handleLogin = (e) => {
    //     //evitar la propagación del formulario
    //     e.preventDefault(); 
    //     console.log(email, password);
    //     dispatch(login(12345,'JulioAg'));
    // }

    const handleLogin = (e) => {
        //evitar la propagación del formulario
        e.preventDefault(); 
        console.log(email, password);
        dispatch(startLoginEmailPassword(email, password));
    }

    //Autenticacion con Google
    const handleGoogleLogin = (e) => {
        //evitar la propagación del formulario
        e.preventDefault(); 
        dispatch(startGoogleLogin ());
    }

    return (
        // <div>
        //     <h1>Login Screen</h1>
        // </div>
        <>
            <h3 className='auth__tittle'>Login</h3>
            <form 
                onSubmit={ handleLogin }
                //animaciones
                className='animate__animated animate__fadeIn animate__faster'
            >
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
                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    // disabled={true}
                    //Se va a desabilitar mientras se pulsa el botón.
                    disabled = { loading }
                >
                    Login
                </button>
                {/* <hr/> */}
                {/* button of google */}
                <div className='auth__social-networks'>
                    <p>Login with social networks</p>
                    {/* Boton de google */}
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

               <Link  
                    to="/auth/register"
                    className='link'
                >
                    Create new account
               </Link> 

            </form>
        </>
    );
};
