import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

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
            {notebookObj && Object.values(notebookObj).map(notebook => {
                return (
                    <p key={notebook.id}>{notebook.title}</p>
                )
            })}
        </div>
    )


}

export default CurrentNotebooks
