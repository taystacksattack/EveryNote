import OpenModalButton from '../../OpenModalButton'
import CreateNewNotebookModel from './NewNotebookModal'
import "./index.css"

const NewNotebook = () => {

    return (
        <div className='create-notebook-feature'>
            <i class="fa-solid fa-book">+</i>
            <OpenModalButton
                buttonText={'New Notebook'}
                modalComponent={<CreateNewNotebookModel />}>
            </OpenModalButton>
        </div>

    )
}

export default NewNotebook
