import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ( { id, date, title, body, url } ) => {
    // console.log(id, date, title, body, url);

    //https://momentjs.com/docs/#/displaying/format/
    // const noteDate = moment(date);
    const noteDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    const noteDateDayOfWeek = moment(date).format('dddd');
    const noteDatenumOfMonth = moment(date).format('MM');
    // console.log(noteDate)
    // console.log(noteDateDayOfWeek)
    // console.log(noteDatenumOfMonth)
    
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(
            activeNote(id, {
                date, title, body, url
            })
            
        );
    }
  return (
    <div 
        className='journal__entry pointer animate__animated animate__fadeInDown animate__faster'
        //animaciones
        // className='animate__animated animate__fadeIn animate__faster'
        // className='animate__animated animate__fadeInDown animate__faster'
        
        onClick={ handleEntryClick }
    >
        {/* JournalEntry */}

        {
            //ejecuta este codigo condicionalmente si existe algo en el url
            url &&
            <div 

                className='journal__entry-picture'
                style={{
                    // https://static.platzi.com/media/blog/mern-stack-284eedb6-ee6b-4441-b181-5064a453a15a.png
                    //https://transformtheworldartistically.files.wordpress.com/2013/11/stalpob.jpg
                    //https://transformtheworldartistically.files.wordpress.com/2013/11/am_79225_5660160_932142.jpg?w=988&h=741
                    backgroundSize: 'cover',
                    // backgroundImage: 'url(https://transformtheworldartistically.files.wordpress.com/2013/11/stalpob.jpg)'

                    backgroundImage: `url(${url})`
                    
                }}
            ></div>

        }
        <div className='journal__entry-body'>
            {/* <p className='journal__entry-title'>
                Un nuevo dia
            </p> */}

            <p className='journal__entry-title'>
                {title}
            </p>

            {/* <p className='journal__entry-content'>
                Algo por aca...
                Reprehenderit in quis quis dolor consequat magna irure esse magna sit nostrud.
            </p> */}
            <p className='journal__entry-content'>
                {body}
            </p>

        </div>

        <div className='journal__entrydate-box'>
            {/* <span>Monday</span>
            <h4>28</h4> */}

            <span>{ noteDateDayOfWeek }</span>
            <h4>{ noteDatenumOfMonth }</h4>

        </div>
    </div>
  )
}
