import OpenModalButton from '../../../OpenModalButton'
import UpdateNotebookModel from './updateModal'

const UpdateNotebook = () => {

    return (
        <OpenModalButton
            buttonText={'Rename notebook'}
            modalComponent={<UpdateNotebookModel />}>
        </OpenModalButton>

    )
}

export default UpdateNotebook
