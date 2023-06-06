import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getNotebooksThunk } from "../../../store/notebook"

import NewNotebook from '../NewNotebook/index'


const CurrentNotebooks = () => {

    const dispatch = useDispatch()

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])

    // if (!notebookObj) return null
    return (
        <div>
            <h1>NOTEBOOKS</h1>
            <NewNotebook />
            <div className="notebook-content-div">
                {notebookObj && Object.values(notebookObj).map(notebook => {
                    return (
                        <div className={`notebook-div-${notebook.id}`}>
                            <p key={notebook.id}>
                                <Link to={`/notebooks/${notebook.id}`}> {notebook.title}</Link>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )


}

export default CurrentNotebooks
