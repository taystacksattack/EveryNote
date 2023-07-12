import { useDispatch } from 'react-redux';
// import { useSelector,} from 'react-redux';
import { useState, useEffect } from 'react';
import { createTaskThunk, getTasksThunk } from '../../store/tasks';
import { useHistory } from 'react-router-dom';
import '../TasksPage/TasksPage.css'


const CreateTask = () =>{
    //form state
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [due_date, setDue_date] = useState('')
    const [completed, setCompleted] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // const currentUser = useSelector((state => state.userState.currentUser))
    const dispatch = useDispatch()
    const history = useHistory()

    const submitForm = async (e) => {
        e.preventDefault()

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Whoops, looks like we've got some invalid input!");

        const formData = new FormData()

        formData.append("title", title)
        formData.append("description", description)
        formData.append("due_date", due_date)
        formData.append("completed", completed)
        console.log("HERE IS THAT FORM DATA YOU ASKED FOR...", formData)

        await dispatch(createTaskThunk(formData))
        await dispatch(getTasksThunk())
        // console.log("response from backend in frontend",response)
        // console.log(response.length)
        // if(response) {
        //     setValidationErrors(response)
        //     console.log("vaidation errors " , validationErrors)

        // }

        setTitle('')
        setDescription('')
        setDue_date('')
        setCompleted(false)
        setHasSubmitted(false)
        history.push('/tasks')
    }

    useEffect(() => {
        const errors = []
        if (title.length<5 ||title.length>30 ) errors.push('Please provide a title between 5 and 50 characters.')
        if (description.length<5 ||description.length>500) errors.push('Please provide a valid description between 5 and 500 characters.')
        if(new Date(due_date).getTime() < Date.now() || !due_date) errors.push('Please provide a valid due date in the future')
        setValidationErrors(errors)
        // if (errors.length) setDisabled(true)
    }, [title, description, due_date])

    return (
        <div className="form-page">
            <div className="form-container">
                {/* <h1>New Task</h1> */}
                <br></br>
                <div className="form-container">
                    {hasSubmitted && validationErrors.length > 0 && (
                        <div className="errors-info">
                            <h2>The following errors were found:</h2>
                            <ul>
                                {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form
                        onSubmit={(e) => submitForm(e)}
                        encType='multipart/form-data'
                    >
                        <label>
                        {/* <div id="task-form-elements"> */}
                            <input
                                placeholder = "Title"
                                id = "title"
                                type='textarea'
                                value = {title}
                                onChange={e=> setTitle(e.target.value)}
                            >
                            </input>
                        {/* </div> */}
                        </label>
                        <label>
                            <textarea
                                placeholder="Description"
                                id = "description"
                                type='textarea'
                                value = {description}
                                onChange={e=> setDescription(e.target.value)}
                            >
                            </textarea>
                        </label>
                        <br></br>
                        <div id="completed-due">
                            <label id="completed">Completed 
                                <input
                                    id = "completed"
                                    type='checkbox'
                                    value = {completed}
                                    onClick={e=> setCompleted(!completed)}
                                >
                                </input>
                            </label>
                            <label id = "due_date_label">Due Date
                                <input
                                    id = "due_date"
                                    type='date'
                                    value = {due_date}
                                    onChange={e=> setDue_date(e.target.value)}
                                >
                                </input>
                            </label>
                        </div>
                        <br></br>
                        <div>
                            <button id="submit_button" type='submit'>Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )




}

export default CreateTask
