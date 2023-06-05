import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooksThunk } from "../../../store/notebook"
import { useHistory } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
// import     from
// import   from  ;
// import './index.css'




const NotebookDetails = () => {

    const dispatch = useDispatch()
    const notebookId = useParams().notebookId

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    console.log("OBJ:", notebookObj)
    console.log("Id:", notebookId)

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])



    return (
        <div>

            <h1>Notebook Details</h1>
            <ol>
                {Object.values(notebookObj).map(nb => {
                    return (
                        <li key={nb.id}>
                            {nb.title}
                        </li>
                    )
                })}
            </ol>

        </div>
    )
}

export default NotebookDetails
