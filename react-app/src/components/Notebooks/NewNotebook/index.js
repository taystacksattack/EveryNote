import OpenModalButton from '../../OpenModalButton'
import CreateNewNotebookModel from './NewNotebookModal'
import "./index.css"

const NewNotebook = () => {

    return (
        <div>
            <i class="fa-solid fa-book">+</i>
            <OpenModalButton
                buttonText={'New Notebook'}
                modalComponent={<CreateNewNotebookModel />}>
            </OpenModalButton>
        </div>

    )
}

export default NewNotebook
