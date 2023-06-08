import OpenModalButton from '../../../OpenModalButton'
import UpdateNotebookModel from './updateModal'
import "./index.css"

const UpdateNotebook = ({ notebook }) => {

    return (
        <OpenModalButton
            buttonText={'Rename notebook'}
            modalComponent={<UpdateNotebookModel notebook={notebook} />}>
        </OpenModalButton>

    )
}

export default UpdateNotebook
