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
    // const user = Object.values(userObj)
    // console.log(userObj)

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])

    const findOwner = () => {
        // const notebook = notebooks.find(notebook => notebook.ownerId)
        // if (notebook.ownerId === userObj.id) return userObj.username
        return userObj.username
    }

    const findTimeUpdated = (notebook) => {
        // console.log('notebook.updated_at', notebook.updated_at)
        let date1 = new Date(notebook.updated_at)
        // console.log("d1", date1)
        let date2 = new Date()
        // console.log("d2", date2)
        let dateDiff = date2.getTime() - date1.getTime()

        // notebook.updated_at = new Date()
        return `${(dateDiff / 86400000).toFixed(1)} days ago`
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

    if (!notebookObj && !notesObj) return null
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
                            <p>{findTimeUpdated(notebook)}</p>
                            <p>{sharedWith()}</p>
                            <label>
                                <div onClick={(e) => changeState()}>
                                    ...
                                </div>
                                <ul  >
                                    <li >
                                        <div onClick={(e) => featureAlert()}>
                                            Add new note
                                        </div>
                                    </li>
                                    <li >
                                        <div onClick={(e) => featureAlert()}>
                                            Share notebook
                                        </div>
                                    </li>
                                    <li className="li-divider">
                                        <div>
                                            <UpdateNotebook notebook={notebook} />
                                        </div>
                                    </li>
                                    <li>
                                        <div onClick={(e) => featureAlert()}>
                                            Delete notebook
                                        </div>
                                    </li>
                                    <li >
                                        <div onClick={(e) => featureAlert()}>
                                            Add to Shortcuts
                                        </div>
                                    </li>
                                    <li >
                                        <div onClick={(e) => featureAlert()}>
                                            Set as default notebook
                                        </div>
                                    </li>
                                    <li >
                                        <div onClick={(e) => featureAlert()} >
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
