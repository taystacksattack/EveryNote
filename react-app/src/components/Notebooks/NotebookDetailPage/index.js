import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooksThunk } from "../../../store/notebook"
import { getNotesThunk } from '../../../store/notes';
import './index.css'

const NotebookDetails = () => {
    const [body, setBody] = useState('')
    const dispatch = useDispatch()
    const notebookId = useParams().notebookId

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notes = useSelector(state => state.notes.allNotes)
    // console.log("notebooks:", Object.values(notebookObj))
    // console.log("notes:", Object.values(notes))

    const filtered = Object.values(notes).filter(note => {
        // console.log(note.notebookId)
        return note.notebookId == notebookId
    })
    // console.log(filtered)

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])
    console.log("body length:", body.length)

    return (
        <div>

            <h1>Notebook Details</h1>
            <div className='notebook-content-wrapper'>

                <div className='notebook-content-left'>
                    <ol>
                        {filtered.map(note => {
                            return (
                                <li
                                    key={note.id}
                                    onClick={(e) => setBody(note.body)}
                                >
                                    <div className=''>
                                        {note.title}

                                    </div>

                                </li>
                            )
                        })}
                    </ol>

                </div>
                <div className='notebook-content-right'>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default NotebookDetails
