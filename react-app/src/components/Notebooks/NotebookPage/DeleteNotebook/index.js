import OpenModalButton from '../../../OpenModalButton'
import DeleteNotebookModal from './deleteModal'

const DeleteNotebook = ({ notebook }) => {

    return (
        <OpenModalButton
            buttonText={'Delete Notebook'}
            modalComponent={<DeleteNotebookModal notebook={notebook} />}>
        </OpenModalButton>

    )
}

export default DeleteNotebook
