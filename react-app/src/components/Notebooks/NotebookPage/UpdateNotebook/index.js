import OpenModalButton from '../../../OpenModalButton'
import UpdateNotebookModel from './updateModal'

const UpdateNotebook = ({ notebook }) => {

    return (
        <OpenModalButton
            buttonText={'Rename notebook'}
            modalComponent={<UpdateNotebookModel notebook={notebook} />}>
        </OpenModalButton>

    )
}

export default UpdateNotebook
