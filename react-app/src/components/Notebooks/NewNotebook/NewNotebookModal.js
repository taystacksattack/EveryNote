import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from 'react';
import { createNotebooksThunk, getNotebooksThunk } from "../../../store/notebook"



const CreateNewNotebookModel = () => {


    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState({})
    const [isDefault] = useState(false)
    const [bool, setBool] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        const err = {}

        if (title.length === 0) err.title = "Your notebook name must contain at least one character"

        if (Object.values(err).length === 0) {

            const new_notebook = {
                "title": title,
                "is_default": isDefault
            }
            dispatch(createNotebooksThunk(new_notebook))
            closeModal()
            setBool(true)
        }
        setErrors(err)
    }
    console.log(errors)
    console.log(title)

    const checkState = () => {
        let boolean = false
        if (title.length === 0) boolean = true
        return boolean
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch, title, errors, checkState])

    return (
        <div className='create-modal-div-wrapper'>
            <form onSubmit={(e) => handleSubmit(e)} className='create-modal-form'>
                <label className='create-modal-label'>
                    <h1>Create new notebook</h1>
                    <p className='create-des'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
                    <div className='create-div-label-input'>

                        <input
                            className='create-modal-form-input'
                            id="input-id"
                            type="text"
                            placeholder='Notebook name'
                            onChange={(e) => setTitle(e.target.value)}
                        >
                        </input>
                    </div>
                </label>
                <p className="errors">&#160;{errors.title}</p>
                <div className='create-button-container'>
                    <button
                        onClick={(e) => closeModal()}
                        className='create-modal-button-cancel'
                    >
                        Cancel
                    </button>
                    <button
                        disabled={(e) => checkState()}
                        type="submit"
                        className='create-modal-button-submit' >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewNotebookModel
