import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"


import UpdateNotebook from "./UpdateNotebook"
import DeleteNotebook from "./DeleteNotebook"
import AddNoteToNotebook from "./AddNote"


const NotebookItems = ({ userObj, notebook, notes }) => {

    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)

    const notesObj = useSelector(state => state.notes.allNotes)

    const notebookId = notebook.id

    const filtered = Object.values(notes).filter(note => {
        return note.notebookId == notebookId
    })

    const findOwner = () => {
        return userObj.username
    }

    const findTimeUpdated = (notebook) => {
        let date1 = new Date(notebook.updated_at)
        let date2 = new Date()
        let dateDiff = date2.getTime() - date1.getTime()
        let lastUpdated = (dateDiff / 86400000).toFixed(1)

        if (lastUpdated < 1.0 && lastUpdated >= 0) return "Today"
        else if (lastUpdated < 2 && lastUpdated > 1) return "Yesterday"
        else return `${Math.floor(lastUpdated)} days ago`

    }

    const changeState = (e) => {
        e.preventDefault()
        if (showMenu) setShowMenu(false)
        else setShowMenu(true)
    }

    const ulClassName = (showMenu ? "" : "hidden");
    const ulClassNameForNotes = (showMenu ? "" : "hidden1");

    return (
        <div className={`notebook-div-container `}>
            <p key={notebook.id}>
                <i class="fa-solid fa-list " onClick={(e) => changeState(e)}>
                    <div className={`notebook-note-dropdown ${ulClassNameForNotes}`}>
                        <ul>
                            {filtered.map(note => {
                                return <li key={note.id}>
                                    <Link to="/notebooks/1">
                                        <p className="notebook-note-dropdown-note-li">
                                            {note.title}
                                        </p>
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                </i>
                <Link to={`/notebooks/${notebook.id}`}>
                    {"   "}
                    {notebook.title}
                    ({notes.filter(note => note.notebookId == notebook.id).length})
                </Link>
            </p>
            <p>{findOwner()}</p>
            <p>{findTimeUpdated(notebook)}</p>
            <label>
                <button onClick={(e) => changeState(e)} className="drop-down-list">
                    <p>...</p>
                </button>

                <div className="notebook-ul-ultra-wrapper">
                    <ul className={`${ulClassName} spot-list`}>
                        <li >
                            <AddNoteToNotebook />
                        </li>
                        <li className="li-divider">
                            <div className="notebook-item-update">
                                <UpdateNotebook notebook={notebook} />
                            </div>
                        </li>
                        <li>
                            <div >
                                <DeleteNotebook notebook={notebook} />
                            </div>
                        </li>
                    </ul>
                </div>
            </label>
        </div >
    )
}


export default NotebookItems
