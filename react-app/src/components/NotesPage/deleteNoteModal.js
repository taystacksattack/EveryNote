import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteNoteThunk} from "../../store/notes";


function DeleteModal({note}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()


    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteNoteThunk(note.id))

        closeModal()
    }

    return (
        <div id='delete-note-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this note?</p>
            <button onClick={handleDelete}>{`Yes (Delete Note)`}</button>
            <button onClick={closeModal}>{`No (Keep Note)`}</button>

        </div>
    )


}


export default DeleteModal
