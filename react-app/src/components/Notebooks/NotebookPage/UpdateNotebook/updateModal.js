import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useModal } from '../../../../context/Modal';
import { editNotebookThunk } from '../../../../store/notebook';



const UpdateNotebookModel = ({ notebook }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [isDefault] = useState(false)

    const handleSubmit = (e) => {
        const new_notebook = {
            "id": notebook.id,
            "title": title,
            "is_default": isDefault
        }
        return dispatch(editNotebookThunk(new_notebook)).closeModal
    }

    const closeForm = (e) => {
        closeModal()
    }

    return (

        <div>
            Rename notebook
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Name
                    <input onChange={(e) => setTitle(e.target.value)}>

                    </input>
                </label>
            </form>
            <div>
                <button onClick={(e) => handleSubmit()} type='submit'>Continue</button>
                <button onClick={(e) => closeForm()}>Cancel</button>
            </div>
        </div>
    )
}


export default UpdateNotebookModel
