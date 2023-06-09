import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editTaskThunk, getTasksThunk } from '../../store/tasks';
import { useHistory, useParams } from 'react-router-dom';

const dateConvertor = (time) =>{
    // console.log(new Date(time).getTime())
    // time = new Date(time).getTime() + new Date(time).getTimezoneOffset()
    console.log(time)
    const year= new Date(time).getFullYear()
    let month = new Date(time).getMonth() + 1 //need to add one to account for python using zero indexes in months
    let date = new Date(time).getDate()

    if ( month.toString().length === 1) month = "0" + month.toString()
    if ( date.toString().length === 1) date = "0" + date.toString()
    console.log("in date convertor" , `${year}-${month}-${date}`)
    return `${year}-${month}-${date}`
}


const EditTask = () =>{
    const {taskId} = useParams()
    const task = useSelector(state => state.tasks.allTasks[taskId])

    //form state
    const [title, setTitle] = useState(task?.title)
    const [description, setDescription] = useState(task?.description)
    const [due_date, setDue_date] = useState(dateConvertor(task?.due_date))
    const [completed, setCompleted] = useState(task?.completed)
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    //`${new Date(task?.due_date).getFullYear()}-${new Date(task?.due_date).getMonth()}-${new Date(task?.due_date).getDate()}`
    // const currentUser = useSelector((state => state.userState.currentUser))
    const dispatch = useDispatch()
    const history = useHistory()



    const editForm = async (e) => {
        e.preventDefault()

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Whoops, looks like we've got some invalid input!");

        const formData = new FormData()

        console.log("wtf is formData",formData)
        console.log('here is the title', title)

        formData.append("title", title)
        formData.append("description", description)
        formData.append("due_date", due_date)
        formData.append("completed", completed)


        console.log("HERE IS THAT FORM DATA YOU ASKED FOR...", formData)
        console.log("task.id",task.id)
        await dispatch(editTaskThunk(task.id, formData))
        await dispatch(getTasksThunk())

        setTitle('')
        setDescription('')
        setDue_date('')
        setCompleted(false)
        setHasSubmitted(false)
        history.push('/tasks')
    }

    useEffect(() => {
        const errors = []
        if (title.length<5 ||title.length>50 ) errors.push('Please provide a title between 5 and 50 characters.')
        if (description.length<5 ||description.length>500) errors.push('Please provide a valid description between 5 and 500 characters.')
        if(new Date(due_date).getTime() < Date.now() || !due_date) errors.push('Please provide a valid due date in the future')
        setValidationErrors(errors)
        // if (errors.length) setDisabled(true)
    }, [title, description, due_date])



    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Edit Task</h1>
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
                    onSubmit={(e) => editForm(e)}
                    encType='multipart/form-data'
                >
                    <label>Title
                        <input
                            id = "title"
                            type='textarea'
                            value = {title}
                            onChange={e=> setTitle(e.target.value)}
                        >
                        </input>
                    </label>
                    <label>Description
                        <input
                            id = "description"
                            type='textarea'
                            value = {description}
                            onChange={e=> setDescription(e.target.value)}
                        >
                        </input>
                    </label>
                    <label>Completed?
                        <input
                            id = "completed"
                            type='checkbox'
                            value = {completed}
                            onClick={e=> setCompleted(!completed)}
                        >
                        </input>
                    </label>
                    <label>Due Date
                        <input
                            id = "due_date"
                            type='date'
                            value = {due_date}
                            onChange={e=> setDue_date(e.target.value)}
                        >
                        </input>
                    </label>
                    <button id="submit_button" type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    )




}

export default EditTask
