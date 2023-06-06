import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useModal } from '../../../../context/Modal';
import { editNotebookThunk } from '../../../../store/notebook';



const UpdateNotebookModel = ({ notebook }) => {

    // console.log("NOTEBOOK in MODAL", notebook)

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [isDefault, setIsDefault] = useState(false)

    const handleSubmit = (e) => {
        console.log("SUBMIT")
        // e.preventDefault()
        const new_notebook = {
            "id": notebook.id,
            "title": title,
            "is_default": isDefault
        }
        console.log("New NOTEBOOK in edit",new_notebook)
        return dispatch(editNotebookThunk(new_notebook)).closeModal
    }

    const closeForm = (e) => {
        // console.log("CLOSE MODAL")
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
