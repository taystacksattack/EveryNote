import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useStore } from 'react-redux';
import { getNotebooksThunk } from "../../../store/notebook"
import { createNoteThunk, editNoteThunk, getNotesThunk } from '../../../store/notes';
import './index.css'
import DeleteModal from '../../NotesPage/deleteNoteModal';
import OpenModalButton from '../../OpenModalButton';

const NotebookDetails = () => {
    const [currentNote, setCurrentNote] = useState({})
    const [newBody, setNewBody] = useState('')
    const [title, setTitle] = useState('')
    const [disabled, setDisable] = useState(true)
    const [bool, setBool] = useState(true)
    const [errors, setErrors] = useState({})
    const [deleteNoteState, setDeleteNoteState] = useState(false)

    const dispatch = useDispatch()
    const notebookId = useParams().notebookId

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notes = useSelector(state => state.notes.allNotes)

    const userObj = useSelector(state => state.session.user)
    const filtered = Object.values(notes).filter(note => {

        return note.notebookId === Number(notebookId)
    })
    const array = Object.values(notebookObj)
    const currentNotebook = array.find(notebook => Number(notebook.id) === Number(notebookId))


    const err = {}
    const handleSubmitUpdate = (e) => {
        e.preventDefault()

        if (title.trim().length === 0) err.title1 = "Your note name must contain at least one character"
        if (title.length > 30) err.title2 = "Title character limit is between 1 and 30 characters"
        if (newBody.length > 2500) err.body2 = "body character limit is between 1 and 2500 characters"
        if (Object.values(err).length === 0) {

            const updateNote = {
                "id": currentNote.id,
                "ownerId": userObj.id,
                "title": title.trim(),
                "body": newBody,
                "notebookId": notebookId,
                "trash": false,
            }
            // console.log(errors)
            setErrors({})
            dispatch(editNoteThunk(updateNote, updateNote.id))
            setBool(!bool)
        }
        setErrors(err)

    }

    const handleSubmitCreate = (e) => {
        e.preventDefault()

        if (title.trim().length === 0) err.title1 = "Your note name must contain at least one character"
        if (title.length > 30) err.title2 = "Title character limit is between 1 and 30 characters"
        if (newBody.length > 2500) err.body2 = "body character limit is between 1 and 2500 characters"

        if (Object.values(err).length === 0) {
            const newNote = {
                "id": currentNote.id,
                "ownerId": userObj.id,
                "title": title || "Untitled",
                "body": newBody,
                "notebookId": notebookId,
                "trash": false,
            }
            // console.log(errors)

            setErrors({})

            dispatch(createNoteThunk(newNote))
            setTitle('')
            setNewBody('')
            setCurrentNote({ title: '' })
            setBool(!bool)
        }
        setErrors(err)

    }

    const bigCheckState = () => {
        let boolean = false
        if (title.length === 0 || title.length > 30) boolean = true
        if (newBody.length === 0 || newBody > 2500) boolean = true
        return boolean
    }


    const setterFunction = (note, e) => {
        setCurrentNote(note)
        setNewBody(note.body)
    }


    const NewNotebookNow = (e) => {
        e.preventDefault()
        setErrors({})
        setTitle('')
        console.log('title', title)
        setNewBody('')
        console.log('newBody', newBody)
        setCurrentNote({ title: '' })
        console.log('currentNote', currentNote)
        setBool(!bool)
    }
    // const deleteButton = (e) => {
    //     NewNotebookNow(e)
    //     // setBool(!bool)
    // }

    let able = disabled ? 'able' : 'disabled'

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch, newBody, bool, title])

    console.log(currentNote)
    return (
        <div id="whole-notebook-wrapper">
            <div>
                <h1 id='notebook-details-h1'>{`${currentNotebook?.title}`}</h1>
                <div className='notebook-content-wrapper'>

                    <div className='notebook-content-left'>

                        <ol>
                            {filtered.map(note => {
                                return (
                                    <li className='notebook-detail-note-li'
                                        key={note.id}
                                        onClick={(e) => setterFunction(note, e)}
                                    >

                                        <p className={`notebook-detail-title ${'currentNoteSelector'}`}>
                                            {note.title}
                                        </p>

                                    </li>
                                )
                            })}
                        </ol>

                    </div>
                    <div className='notebook-detail-content-right'>
                        <form type="submit" className='notebook-details-form'>
                            <label type="type">
                                <textarea
                                    className='notebook-detail-textarea-title'
                                    value={title ? title : currentNote.title}
                                    // value={title }
                                    placeholder='Title'
                                    onChange={(e) => setTitle(e.target.value)}
                                ></textarea>
                            </label>
                            <p className='errors'>{errors.title1 || errors.title2}</p>
                            <label type="text">
                                <textarea
                                    className='notebook-detail-textarea-body'
                                    value={newBody}
                                    onChange={(e) => setNewBody(e.target.value)}
                                ></textarea>
                            </label>
                            <p className='errors'>{errors.body2}</p>

                            {/* {updateOrCreate()} */}
                            <div className={`notebook-detail-button-container`}>
                                <button className={`Update-New-Note  ${able}`} type="submit" disabled={!currentNote.id} onClick={handleSubmitUpdate}>
                                    Update {currentNote.title} Note
                                </button>
                                <button className='Reset-Note' type='submit' onClick={(e) => NewNotebookNow(e)}>Reset Note</button>
                                <button className={`Create-New-Note  ${able}`} type='submit' disabled={currentNote.id && bigCheckState()} onClick={handleSubmitCreate}>Create New Note</button>
                                <div className='div-delete-note'>
                                    <div className={(Object.values(currentNote)).length===0 ? "hidden" :'notebook-Delete-Note'} type='submit' onClick={(e) => NewNotebookNow(e)}>
                                        <OpenModalButton
                                            buttonText='🗑'
                                            modalComponent={<DeleteModal note={currentNote} setDeleteNoteState={setDeleteNoteState} deleteNoteState={deleteNoteState} />}
                                        />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default NotebookDetails
