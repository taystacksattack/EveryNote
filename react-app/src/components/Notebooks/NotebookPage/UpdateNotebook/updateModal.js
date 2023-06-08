import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useModal } from '../../../../context/Modal';
import { editNotebookThunk, getNotebooksThunk } from '../../../../store/notebook';



const UpdateNotebookModel = ({ notebook }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState(notebook.title)
    const [errors, setErrors] = useState({})
    const [isDefault] = useState(false)
    const [bool, setBool] = useState(false)



    const handleSubmit = (e) => {
        const err = {}
        e.preventDefault()

        if (title.length === 0) err.title = "Your notebook name must contain at least one character"

        if (Object.values(err).length === 0) {

            const new_notebook = {
                "id": notebook.id,
                "title": title,
                "is_default": isDefault
            }
            dispatch(editNotebookThunk(new_notebook))
            closeModal()
            setBool(true)
        }
        setErrors(err)
    }



    const checkState = () => {
        let boolean = false
        if (title.length === 0) boolean = true
        return boolean
    }

    const closeForm = (e) => {
        closeModal()
    }

    console.log("update", title)
    console.log("update", errors)


    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch, title, errors, checkState])

    return (

        <div className='update-modal-div-wrapper'>

            <form
                onSubmit={(e) => handleSubmit(e)} className='update-modal-form'>
                <label className='update-modal-label'>
                    <p className='update-dis'>Name</p>
                    <div className='update-div-label-input'>
                        <input
                            className='update-modal-form-input'
                            onChange={(e) => setTitle(e.target.value)}
                            id='input-id'
                            type='text'
                            value={title}
                        >
                        </input>
                    </div>
                </label>
                <p className="errors">&#160;{errors.title}</p>
                <div className='update-button-container'>
                    <button onClick={(e) => closeForm()}
                        className='update-modal-button-cancel'>Cancel
                    </button>
                    <button
                        disabled={(e) => checkState()}
                        // disabled={!!Object.values(errors).length}
                        type='submit'
                        onClick={(e) => handleSubmit(e)}
                        className='update-modal-button-submit'
                    >Continue</button>
                </div>
            </form>
        </div >
    )
}


export default UpdateNotebookModel
