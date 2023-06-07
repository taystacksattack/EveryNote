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

    // const sharedWith = () => {
    //     return "Feature coming Soon!"
    // }

    const changeState = (e) => {
        // e.stopPropagation()
        if (showMenu) setShowMenu(false)
        else setShowMenu(true)
    }

    // const featureAlert = () => {
    //     window.alert('Feature Coming Soon...')
    // }
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className={`notebook-div-container `}>
            <p key={notebook.id}>
                <Link to={`/notebooks/${notebook.id}`}>

                    {notebook.title}    ({notes.filter(note => note.notebookId == notebook.id).length})</Link>
            </p>
            <p>{findOwner()}</p>
            <p>{findTimeUpdated(notebook)}</p>
            {/* <p>{sharedWith()}</p> */}
            <label>
                <div onMouseEnter={(e) => changeState(e)} >
                    ...
                </div>
                <ul className={`${ulClassName}-${notebook.id} spot-list`}>
                    <li >
                        <div onClick={(e) => history.push("/notes")}>
                            Add new note
                        </div>
                    </li>
                    {/* <li >
                        <div onClick={(e) => featureAlert()}>
                            Share notebook
                        </div>
                    </li> */}
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
                    {/* <li >
                        <div onClick={(e) => featureAlert()}>
                            Add to Shortcuts
                        </div>
                    </li> */}
                    {/* <li >
                        <div onClick={(e) => featureAlert()}>
                            Set as default notebook
                        </div>
                    </li> */}
                    {/* <li >
                        <div onClick={(e) => featureAlert()} >
                            Add to stack
                        </div>
                    </li> */}
                </ul>
            </label>
        </div>
    )
}


export default NotebookItems
