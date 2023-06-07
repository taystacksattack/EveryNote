import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from 'react';
import { createNotebooksThunk, getNotebooksThunk } from "../../../store/notebook"



const CreateNewNotebookModel = () => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [isDefault] = useState(false)
    const [bool, setBool] = useState(false)

    const handleSubmit = (e) => {
        const new_notebook = {
            "title": title,
            "is_default": isDefault
        }
        dispatch(createNotebooksThunk(new_notebook))
        closeModal()
        setBool(true)
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch, closeModal])

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
                <button type="submit"  >
                    Create new Notebook
                </button>
            </form>
        </div>
    )
}

export default CreateNewNotebookModel
