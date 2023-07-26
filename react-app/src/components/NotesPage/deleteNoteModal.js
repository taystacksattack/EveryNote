import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteNoteThunk } from "../../store/notes";


function DeleteModal({ note, setDeleteNoteState, deleteNoteState}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()


    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteNoteThunk(note.id))
        setDeleteNoteState(!deleteNoteState)

        closeModal()
    }

    console.log("HERE IS SETDELETENOTESTATE", setDeleteNoteState)
    console.log("HERE IS DELETENOTESTATE", deleteNoteState)

    return (
        <div id='delete-note-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this note?</p>
            <div className="button-container">

                <div
                    className="delete-modal">
                    <button
                        className="delete-cancel"
                        onClick={closeModal}>{`Cancel`}</button>
                        {/* onClick={closeModal}>{`No (Keep Note)`}</button> */}
                </div>
                <div className="delete-modal">
                    <button
                        className="delete-submit"
                        onClick={handleDelete}>
                        {`Delete Note`}
                        {/* {`Yes (Delete Note)`} */}
                    </button>
                </div>
            </div>

        </div>
    )


}


export default DeleteModal
