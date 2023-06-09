import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState,  } from "react"
import { useHistory, NavLink, Link } from "react-router-dom"
import { deleteTaskThunk, getTasksThunk } from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
import CreateTask from "../CreateTask"
import EditTask from "../EditTask"
import './TasksPage.css'
// import { closeModal } from "../DeleteTaskModal";


//wassup


const CurrentTasks = () => {
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('due_date');
    const [showNewTasks, setShowNewTasks] = useState(false);
    const [showEditTasks, setShowEditTasks] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    let tasksObj = useSelector(state => state.tasks.allTasks)
    // tasksObj = tasksObj.allTasks //total bandaid for delete tasks issue

    console.log("task to edit", taskToEdit)
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


    const handleTaskEdit = (e) => {
        setShowNewTasks(!showNewTasks)
        setTaskToEdit(e)
        setShowEditTasks(!showEditTasks)
    }

    const handleNewTask = (e) => {
        setShowNewTasks(!showNewTasks)
        if (showEditTasks) setShowEditTasks(!showEditTasks)
    }


    if(!tasksObj) return (<div>Loading</div>)
    console.log("heres the data ", tasks)
    return(
        <div>
            <div id='tasks-area-wrapper'>
                <div id="tasks-list">
                    <h1>Tasks</h1>
                    <Link onClick={e=>handleNewTask(e)}>New Task</Link>
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
                                {/* <NavLink exact to = {`/tasks/${task.id}/edit`} id="edit_task_link">
                                    Edit task
                                </NavLink> */}
                                <Link onClick={e=> handleTaskEdit(task.id)}>Edit Task</Link>

                                <OpenModalButton
                                buttonText = "Delete"
                                modalComponent={<DeleteTaskModal task={task} />}
                                />
                            </div>
                        )
                    })}
                </div>
                <div id="task-input-area">
                    {showNewTasks ? <CreateTask/> : null}
                    {showEditTasks ? <EditTask taskId={taskToEdit}/> : null}
                    {/* <SingleTask/> */}
                </div>
            </div>
        </div>

    )

}

export default CurrentTasks
