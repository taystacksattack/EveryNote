import { useDispatch } from 'react-redux';
import { useModal } from "../../../../context/Modal"
import { useEffect, useState } from 'react';
import { deleteNotebookThunk, getNotebooksThunk } from '../../../../store/notebook';

const DeleteNotebookModal = ({ notebook }) => {

    const [bool, setBool] = useState(false)

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        dispatch(deleteNotebookThunk(notebook))
        setBool(true)
        closeModal()
    }
    const closeForm = (e) => {
        closeModal()
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Delete notebook?</h1>
            <p>Any notes in the notebook will be moved to Trash.This cannot be undone.</p>
            <div>

                <button
                    className="cancel-button"
                    onClick={(e) => closeForm()}
                >
                    Cancel
                </button>
                <button
                    className="delete-button"
                    onClick={(e) => handleSubmit()}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteNotebookModal
