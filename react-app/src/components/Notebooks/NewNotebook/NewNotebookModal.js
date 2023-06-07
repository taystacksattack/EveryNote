import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createNotebooksThunk } from "../../../store/notebook"
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";


const CreateNewNotebookModel = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [isdefault, setIsDefault] = useState(false)


    const handleSubmit = (e) => {
        // e.preventDefault()
        const new_notebook = {
            "title": title,
            "is_default": isdefault
        }
        return dispatch(createNotebooksThunk(new_notebook)).closeModal()
    }

    const closeForm = (e) => {
        closeModal()
    }


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Title
                    <input
                        id="input-id"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                    Make This Default?
                    <input
                        id="input-default"
                        type='checkbox'
                    >
                    </input>
                </label>
                <button type="submit">
                    Create new Notebook
                </button>
            </form>
        </div>
    )
}

export default CreateNewNotebookModel
