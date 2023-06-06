import OpenModalButton from '../../../components/OpenModalButton'
import CreateNewNotebookModel from './NewNotebookModal'

const NewNotebook = () => {

    return (
        <OpenModalButton
            buttonText={'New Notebook'}
            modalComponent={<CreateNewNotebookModel />}>
        </OpenModalButton>

    )
}

export default NewNotebook
