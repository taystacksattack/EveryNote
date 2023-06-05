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
    const [isdefault, setIsDefault] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
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
