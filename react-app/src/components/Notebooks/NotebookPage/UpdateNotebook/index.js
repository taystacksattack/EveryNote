import OpenModalButton from '../../../OpenModalButton'
import UpdateNotebookModel from './updateModal'

const UpdateNotebook = () => {

    return (
        <OpenModalButton
            buttonText={'Rename notebook'}
            modalComponent={<UpdateNotebookModel notebook={notebook} />}>
        </OpenModalButton>

    )
}

export default UpdateNotebook
