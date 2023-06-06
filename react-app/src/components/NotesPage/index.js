import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
import { getNotesThunk, createNoteThunk, editNoteThunk } from "../../store/notes"
import "./notespage.css"

const CurrentNotes = () => {

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [trash, setTrash] = useState(false)
    const [clicked, setClicked] = useState({})


    const dispatch = useDispatch()
    const notesObj = useSelector(state => state.notes.allNotes)

    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])

    useEffect(() => {
        if (trash === true) {

            dispatch(createNoteThunk(newNote))
            setTitle('')
            setNoteContent('')
        }
    }, [dispatch, trash])

    // console.log("notes object", notesObj)

    const owner = useSelector(state => state.session.user)

    // notebookId hardcoded for now, gotta remember to make it dynamic later

    // console.log('trash', trash)
    const newNote = {
        title,
        body: noteContent,
        ownerId: owner.id,
        notebookId: 1,
        trash: trash

    }
    
    const handleNoteClick = async (note) => {
        setTitle(note.title)
        setNoteContent(note.body)
        setClicked(note)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(clicked).length > 0) {
            console.log("updatingggggggggggg", title, noteContent)
            console.log("note info", clicked)
            // const updatedDate = Date.now()
     
            const updatedNote = {
                title,
                body: noteContent,
                // updated_at: updatedDate
            }
                

            
            await dispatch(editNoteThunk(updatedNote, clicked.id))
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

                {/* AS DIV */}
                {notesObj && listOfNotes.map(note => (
                    <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                        <p >{note.title}</p>
                        <p>{note.updated_at}</p>
                    </div>
                ))}


                {/* AS BUTTON */}
                {/* {notesObj && listOfNotes.map(note => (
                    <button key={note.id} className='note-selection'>
                        {note.title}
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        {note.updated_at}
                    </button>
                ))} */}

            </div>

            <div className='new-note-area'>
                <form id='new-note-form' onSubmit={handleSubmit} method={Object.values(clicked).length ? "PUT" : "POST"}>

                    <textarea
                        id='title-textarea'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                <button onClick={(e) => setTrash(!trash)}>trash</button>
            </div>


        </div>
    )

}

export default CurrentNotes
