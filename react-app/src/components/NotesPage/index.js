import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
import { getNotesThunk, createNoteThunk } from "../../store/notes"
import "./notespage.css"

const CurrentNotes = () => {

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [trash, setTrash] = useState(false)

    const dispatch = useDispatch()
    const notesObj = useSelector(state => state.notes.allNotes)

    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch,])

    // console.log("notes object", notesObj)

    const owner = useSelector(state => state.session.user)

    // notebookId hardcoded for now, gotta remember to make it dynamic later
    const newNote = {
        title,
        body: noteContent,
        ownerId: owner.id,
        notebookId: 1
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createNoteThunk(newNote))

    }


    if (!notesObj) return (<div>Loading</div>)
    return (
        <div className='everything-wrapper'>
            <div className='all-notes-area'>
                <h1>Notes</h1>
                {notesObj && Object.values(notesObj).map(note => (
                    <div key={note.id} className='note-selection'>
                        <p >{note.title}</p>
                        <p>{note.updated_at}</p>
                    </div>
                ))}

            </div>

            <div className='new-note-area'>
                <form id='new-note-form' onSubmit={handleSubmit} method="POST">

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

                    <button id='save-note-btn'>Save Note</button>

                </form>
            </div>      


        </div>
    )

}

export default CurrentNotes
