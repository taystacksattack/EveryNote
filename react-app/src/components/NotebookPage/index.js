import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getNotebooksThunk } from "../../store/notebook"

const CurrentNotebooks = () => {
    const dispatch = useDispatch()

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)

    console.log("NotebookObj:", notebookObj)

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])

    // if (!notebookObj) return null
    return (
        <div>
            <h1>NOTEBOOKS</h1>
            <div className="notebook-content-div">
                {notebookObj && Object.values(notebookObj).map(notebook => {
                    return (
                        <p key={notebook.id}>
                            <Link to={`/${notebook.id}`}> {notebook.title}</Link>
                        </p>
                    )
                })}
            </div>
        </div>
    )


}

export default CurrentNotebooks
