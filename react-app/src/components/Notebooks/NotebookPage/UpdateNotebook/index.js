import OpenModalButton from '../../../OpenModalButton'
import UpdateNotebookModel from './updateModal'
import "./index.css"

const UpdateNotebook = ({ notebook }) => {

    return (
        <div className='update-notebook-feature'>
            <OpenModalButton
                buttonText={'Rename'}
                modalComponent={<UpdateNotebookModel notebook={notebook} />}>
            </OpenModalButton>
        </div>

    )
}

export default UpdateNotebook
