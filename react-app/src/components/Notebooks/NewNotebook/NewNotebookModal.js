import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNotebooksThunk } from "../../../store/notebook"

import { useModal } from "../../../context/Modal";


const CreateNewNotebookModel = () => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [isDefault] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        const new_notebook = {
            "title": title,
            "is_default": isDefault
        }
        console.log("New Notebook in Create", new_notebook)
        return dispatch(createNotebooksThunk(new_notebook)).closeModal
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
                {/* <label>
                    Make This Default?
                    <input
                        id="input-default"
                        type='checkbox'
                        onClick={(e) => booleanValue(isDefault)}
                    >
                    </input>
                </label> */}
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                    Create new Notebook
                </button>
            </form>
        </div>
    )
}

export default CreateNewNotebookModel
