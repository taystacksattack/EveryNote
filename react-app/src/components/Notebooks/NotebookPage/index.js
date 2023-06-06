import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import './index.css'

import NewNotebook from '../NewNotebook/index'
import { getNotebooksThunk } from "../../../store/notebook"
import { getNotesThunk } from "../../../store/notes"
import UpdateNotebook from "./UpdateNotebook/updateModal"




const CurrentNotebooks = () => {

    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notebooks = Object.values(notebookObj)

    const notesObj = useSelector(state => state.notes.allNotes)
    const notes = Object.values(notesObj)

    const userObj = useSelector(state => state.session.user)
    const user = Object.values(userObj)

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])

    const findOwner = () => {
        const notebook = notebooks.find(notebook => notebook.ownerId)
        if (notebook.ownerId === userObj.id) return userObj.username
    }

    const findTimeUpdated = () => {
        return "TO BE STARTED"
    }

    const sharedWith = () => {
        return "TO BE STARTED"
    }

    const changeState = () => {
        if (showMenu) setShowMenu(false)
        else setShowMenu(true)
    }

    const featureAlert = () => {
        window.alert('Feature Coming Soon...')
    }
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    if (!notebookObj) return null
    return (
        <div className="notebook-wrapper">
            <h1>NOTEBOOKS</h1>
            <div className="new-notebook-component">
                <NewNotebook />
            </div>
            <div className={`notebook-div-container`}>
                <p>TITLE</p>
                <p>CREATED BY</p>
                <p>UPDATED</p>
                <p>SHARED WITH</p>
                <p>ACTIONS</p>
            </div>
            <div className="notebook-content-div">
                {notebookObj && Object.values(notebookObj).map(notebook => {
                    return (
                        <div className={`notebook-div-container`}>
                            <p key={notebook.id}>
                                <Link to={`/notebooks/${notebook.id}`}>

                                    {notebook.title}    ({notes.filter(note => note.notebookId == notebook.id).length})</Link>
                            </p>
                            <p>{findOwner()}</p>
                            <p>{findTimeUpdated()}</p>
                            <p>{sharedWith()}</p>
                            <label>
                                <div onClick={(e) => changeState()}>
                                    ...
                                </div>
                                <ul  >
                                    <li >
                                        <div>
                                            Add new note
                                        </div>
                                    </li>
                                    <li >
                                        <div>
                                            Share notebook
                                        </div>
                                    </li>
                                    <li className="li-divider">
                                        <div>
                                            {/* <UpdateNotebook /> */}
                                        </div>
                                    </li>
                                    <li >
                                        <div>
                                            Add to Shortcuts
                                        </div>
                                    </li>
                                    <li >
                                        <div>
                                            Set as default notebook
                                        </div>
                                    </li>
                                    <li >
                                        <div  >
                                            Add to stack
                                        </div>
                                    </li>
                                </ul>
                            </label>
                        </div>
                    )
                })}
            </div>
        </div >
    )


}

export default CurrentNotebooks
