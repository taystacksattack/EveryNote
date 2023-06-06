import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
import { getNotesThunk, createNoteThunk, editNoteThunk } from "../../store/notes"
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "./deleteNoteModal"
import "./notespage.css"

const CurrentNotes = () => {

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [trash, setTrash] = useState(false)
    const [clickedNote, setClickedNote] = useState({})


    const dispatch = useDispatch()
    const notesObj = useSelector(state => state.notes.allNotes)
    const owner = useSelector(state => state.session.user)

    const newNote = {
        title,
        body: noteContent,
        ownerId: owner.id,
        notebookId: 1,
        trash: trash

    }
    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])


    //FOR IF I WANT TRASH STORAGE IMPLEMENTATION LATER
    // useEffect(() => {
    //     if (trash === true) {

    //         dispatch(createNoteThunk(newNote))
    //         setTitle('')
    //         setNoteContent('')
    //     }
    // }, [dispatch, trash])

  



    // notebookId hardcoded for now, gotta remember to make it dynamic later

    // console.log('trash', trash)


    const handleNoteClick = async (note) => {
        setTitle(note.title)
        setNoteContent(note.body)
        setClickedNote(note)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(clickedNote).length > 0) {
            console.log("updatingggggggggggg", title, noteContent)
            console.log("note info", clickedNote)
            // const updatedDate = Date.now()

            const updatedNote = {
                title,
                body: noteContent,
                // updated_at: updatedDate
            }



            await dispatch(editNoteThunk(updatedNote, clickedNote.id))
            dispatch(getNotesThunk())
        } else {

            dispatch(createNoteThunk(newNote))
        }

    }
    const listOfNotes = Object.values(notesObj).filter(note => note.trash === false)

    if (!notesObj) return (<div>Loading</div>)

    return (
        <div className='everything-wrapper'>
            <div className='all-notes-area'>
                <h1>Notes</h1>

                {notesObj && listOfNotes.map(note => (
                    <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                        <p >{note.title}</p>
                        <p>{note.updated_at}</p>
                        <div className="trash-btn-container">
                        <OpenModalButton
                            buttonText="Trash"
                            modalComponent={<DeleteModal note={note} />}
                        />
                        </div>
                    </div>
                ))}


            </div>

            <div className='new-note-area'>
                <form id='new-note-form' onSubmit={handleSubmit} method={Object.values(clickedNote).length ? "PUT" : "POST"}>

                    <textarea
                        id='title-textarea'
                        value={title}
                        onChange={(e) => setTitle(e.target.value) }
                        placeholder='Title'
                    >
                    </textarea>
                    <textarea
                        id='note-content-textarea'
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder='Start writing'
                        rows='50'
                    >
                    </textarea>
                    <button type='submit' id='save-note-btn'>Save Note</button>

                </form>
                {/* FOR IF I WANT TRASH STORAGE INSTEAD OF IMMEDIATE DELETION LATER*/}
                {/* <button onClick={(e) => setTrash(!trash)}>trash</button> */}

            </div>


        </div>
    )

}

export default CurrentNotes
