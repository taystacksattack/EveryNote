import OpenModalButton from '../../../components/OpenModalButton'
import CreateNewNotebookModel from './NewNotebookModal'

const NewNotebook = () => {

    return (
        <OpenModalButton
            buttonText={'Create New Notebook 2'}
            modalComponent={<CreateNewNotebookModel />}>
        </OpenModalButton>

    )
}

export default NewNotebook
