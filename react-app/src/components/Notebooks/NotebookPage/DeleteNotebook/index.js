import OpenModalButton from '../../../OpenModalButton'
import DeleteNotebookModal from './deleteModal'
import './index.css'

const DeleteNotebook = ({ notebook }) => {

    return (
        <OpenModalButton
            buttonText={'Delete'}
            modalComponent={<DeleteNotebookModal notebook={notebook} />}>
        </OpenModalButton>

    )
}

export default DeleteNotebook
