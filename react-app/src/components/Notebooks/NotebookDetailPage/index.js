import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNotebookThunk, getNotebooksThunk } from "../../../store/notebook"
import { getNotesThunk } from '../../../store/notes';
import './index.css'

const NotebookDetails = () => {
    const [currentNote, setCurrentNote] = useState({})
    const [newBody, setNewBody] = useState('')

    const dispatch = useDispatch()
    const notebookId = useParams().notebookId

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notes = useSelector(state => state.notes.allNotes)

    const filtered = Object.values(notes).filter(note => {

        return note.notebookId == notebookId
    })

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updateNotebook = {
            "id": currentNote.id,
            "title": currentNote.title,
            "body": newBody
        }

        // dispatch(editNotebookThunk(updateNotebook))
    }

    const setterFunction = (note, e) => {
        setCurrentNote(note)
        setNewBody(note.body)
    }

    return (
        <div>

            <h1>Notebook Details</h1>
            <div className='notebook-content-wrapper'>

                <div className='notebook-content-left'>
                    <ol>
                        {filtered.map(note => {
                            { console.log(note) }
                            return (
                                <li
                                    key={note.id}
                                    onClick={(e) => setterFunction(note, e)}
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
                    <label type="submit">

                        <label type="text">
                            <textarea
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                            ></textarea>
                            <button type="submit" onClick={handleSubmit}>update</button>
                        </label>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NotebookDetails
