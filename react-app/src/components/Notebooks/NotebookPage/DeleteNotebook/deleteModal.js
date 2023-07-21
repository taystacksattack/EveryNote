import { useDispatch } from 'react-redux';
import { useModal } from "../../../../context/Modal"
import { useEffect } from 'react';
// import { useState } from 'react';
import { deleteNotebookThunk, getNotebooksThunk } from '../../../../store/notebook';

const DeleteNotebookModal = ({ notebook }) => {

    // const [bool, setBool] = useState(false)

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        // console.log(notebook)
        // console.log(notebook.is_default)
        if (notebook.is_default === true) return window.alert("Cannot delete Default Notebook")
        dispatch(deleteNotebookThunk(notebook))
        // setBool(true)
        closeModal()
    }
    const closeForm = (e) => {
        closeModal()
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])

    return (
        <div className='delete-modal-div-wrapper '>
            <h1 className='delete-h1'>Delete notebook?</h1>
            <p className='delete-p'>Any notes in the notebook will be moved to Trash.This cannot be undone.</p>
            <div className='delete-button-container'>

                <button
                    className="delete-modal-button-cancel"
                    onClick={(e) => closeForm()}
                >
                    Cancel
                </button>
                <button
                    className="delete-modal-button-submit"
                    onClick={(e) => handleSubmit()}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteNotebookModal
