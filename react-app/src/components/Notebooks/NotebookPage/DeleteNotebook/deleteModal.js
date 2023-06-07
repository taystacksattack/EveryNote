import { useDispatch } from 'react-redux';


import { useModal } from "../../../../context/Modal"
import { deleteNotebookThunk } from '../../../../store/notebook';

const DeleteNotebookModal = ({ notebook }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        return dispatch(deleteNotebookThunk(notebook)).closeModal
    }
    const closeForm = (e) => {
        closeModal()
    }
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
