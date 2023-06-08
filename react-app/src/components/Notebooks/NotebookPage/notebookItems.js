import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"


import UpdateNotebook from "./UpdateNotebook"
import DeleteNotebook from "./DeleteNotebook"



const NotebookItems = ({ userObj, notebook, notes }) => {

    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

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

    return (
        <div className={`notebook-div-container `}>
            <p key={notebook.id}>
                <Link to={`/notebooks/${notebook.id}`}>
                    <i class="fa-solid fa-book"></i>{"   "}
                    {notebook.title}    ({notes.filter(note => note.notebookId == notebook.id).length})</Link>
            </p>
            <p>{findOwner()}</p>
            <p>{findTimeUpdated(notebook)}</p>
            <label>
                <button onClick={(e) => changeState(e)} className="drop-down-list">
                    <p>...</p>
                </button>

                <ul className={`${ulClassName} spot-list`}>
                    <li >
                        <div onClick={(e) => history.push("/notes")}>
                            Add new note
                        </div>
                    </li>
                    <li className="li-divider">
                        <div>
                            <UpdateNotebook notebook={notebook} />
                        </div>
                    </li>
                    <li>
                        <div >
                            <DeleteNotebook notebook={notebook} />
                        </div>
                    </li>

                </ul>
            </label>
        </div>
    )
}


export default NotebookItems
