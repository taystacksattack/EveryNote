import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getNotebooksThunk } from "../../../store/notebook"
import { createNoteThunk, editNoteThunk, getNotesThunk } from '../../../store/notes';
import './index.css'
import DeleteModal from '../../NotesPage/deleteNoteModal';
import OpenModalButton from '../../OpenModalButton';

const NotebookDetails = () => {
    const [currentNote, setCurrentNote] = useState({})
    const [newBody, setNewBody] = useState('')
    const [title, setTitle] = useState('')
    const [bool, setBool] = useState(true)

    const dispatch = useDispatch()
    const notebookId = useParams().notebookId

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notes = useSelector(state => state.notes.allNotes)

    const userObj = useSelector(state => state.session.user)
    console.log("userOjb", userObj)
    const filtered = Object.values(notes).filter(note => {

        return note.notebookId == notebookId
    })


    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        const updateNote = {
            "id": currentNote.id,
            "ownerId": userObj.id,
            "title": title,
            "body": newBody,
            "notebookId": notebookId,
            "trash": false,
        }
        console.log("update:", updateNote)
        dispatch(editNoteThunk(updateNote, updateNote.id))
        setBool(!bool)
    }

    const handleSubmitCreate = (e) => {
        e.preventDefault()
        const newNote = {
            "id": currentNote.id,
            "ownerId": userObj.id,
            "title": title,
            "body": newBody,
            "notebookId": notebookId,
            "trash": false,
        }
        console.log("newNote:", newNote)
        dispatch(createNoteThunk(newNote))
        setTitle('')
        setNewBody('')
        setCurrentNote({ title: '' })
        setBool(!bool)

    }

    const deleteButton = (e) => {
        e.preventDefault()
        setBool(!bool)
    }

    const setterFunction = (note, e) => {
        setCurrentNote(note)
        setNewBody(note.body)
    }

    const updateOrCreate = () => {
        if (currentNote.id) {
            return <button type="submit" onClick={handleSubmitUpdate}>update</button>
        }
        return <button type='submit' onClick={handleSubmitCreate}>create</button>
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
        // setTitle('')
    }, [dispatch, newBody, bool, title])



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
                                    onClick={(e) => setterFunction(note, e)}
                                >
                                    <div>
                                        <p className={`notebook-detail-title ${'currentNoteSelector'}`}>
                                            {note.title}
                                        </p>

                                    </div>
                                    <div id="delete-note-modal-container" onClick={(e) => deleteButton(e)}>
                                        <OpenModalButton
                                            buttonText='🗑'
                                            modalComponent={<DeleteModal note={note} />}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ol>

                </div>
                <div className='notebook-detail-content-right'>
                    <label type="submit">
                        <label type="type">
                            <textarea
                                className='notebook-detail-textarea-title'
                                value={title ? title : currentNote.title}
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)}
                            ></textarea>
                        </label>
                        <label type="text">
                            <textarea
                                className='notebook-detail-textarea-body'
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                            ></textarea>
                        </label>
                        {updateOrCreate()}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NotebookDetails
