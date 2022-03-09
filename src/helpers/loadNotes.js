import { db } from "../firebase/firebase-config"



export const loadNotes = async ( uid ) => {

    //refereniando a la base de datos ncon la variable: db
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];
    //muestra todas las notas en crudo...
    // console.log(notesSnap);
    notesSnap.forEach( snapHijo => {
        // console.log(snapHijo.data());
        //llenamos el arreglo notes []
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    } )

        //muestra las notas como las queremos...
    console.log(notes);

    return notes;
}