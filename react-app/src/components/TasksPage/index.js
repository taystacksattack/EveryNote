import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState,  } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { deleteTaskThunk, getTasksThunk } from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
// import { closeModal } from "../DeleteTaskModal";


//wassup


const CurrentTasks = () => {
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('due_date');

    let tasksObj = useSelector(state => state.tasks.allTasks)
    // tasksObj = tasksObj.allTasks //total bandaid for delete tasks issue


    // console.log("tasksLength", tasksLength)
    const tasksArr = Object.values(tasksObj)
    // console.log("tasks array",tasksArr)
    useEffect(()=>{
        const sortedTasks = type => {
            const sorted = [...tasksArr].sort((a, b) =>{
                if (type !== "title"){
                    return new Date(a[type]) - new Date (b[type])
                } else{
                    return a.title.localeCompare(b.title)
                }
            });
            console.log("sorted stuff in function",sorted)
            setTasks(sorted)
            // console.log("sortedTasks",sortedTasks)
        }
        sortedTasks(sortType)
    },[sortType, tasksArr.length])

    useEffect(()=>{
        dispatch(getTasksThunk())
    }, [dispatch, ])

    if(!tasksObj) return (<div>Loading</div>)
    console.log("heres the data ", tasks)
    return(
        <div>
            <h1>Tasks</h1>
            <NavLink exact to = '/tasks/new' id="new_task_link">
                New task
            </NavLink>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="due_date">Due Date</option>
                <option value="created_at">Created Date</option>
                <option value="title">Title, A-Z</option>
            </select>
            {tasksObj && tasks.map(task => {
                return(
                    <div key={task.id}>
                        <p key={task.id}>Task: {task.title}</p>
                        <p key={task.id}>Due: {task.due_date.slice(0,16)}</p>
                        <NavLink exact to = {`/tasks/${task.id}/edit`} id="edit_task_link">
                            Edit task
                        </NavLink>
                        <OpenModalButton
                        buttonText = "Delete"
                        modalComponent={<DeleteTaskModal task={task} />}
                        />
                    </div>
                )
            })}

        </div>

    )

}

export default CurrentTasks
