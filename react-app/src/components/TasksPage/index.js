import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState,  } from "react"
// import { useHistory, NavLink} from "react-router-dom"
import {Link } from "react-router-dom"
import { getTasksThunk } from "../../store/tasks"
// import { deleteTaskThunk,} from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
import CreateTask from "../CreateTask"
import EditTask from "../EditTask"
import SingleTask from './SingleTask'
import './TasksPage.css'
// import { closeModal } from "../DeleteTaskModal";


//wassup


const CurrentTasks = () => {
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('due_date');
    const [showTask, setShowTask] = useState(false);
    const [showNewTasks, setShowNewTasks] = useState(false);
    const [showEditTasks, setShowEditTasks] = useState(false);
    const [singleTask, setSingleTask] = useState(null);

    let tasksObj = useSelector(state => state.tasks.allTasks)
    // tasksObj = tasksObj.allTasks //total bandaid for delete tasks issue

    // console.log("task to edit", singleTask)
    const tasksArr = Object.values(tasksObj)
    // console.log("tasks array",tasksArr)
    useEffect(()=>{
        const sortedTasks = type => {
            const sorted = tasksArr.sort((a, b) =>{
                if (type !== "title"){
                    return new Date(a[type]) - new Date (b[type])
                } else{
                    return a.title.localeCompare(b.title)
                }
            });
            // console.log("sorted stuff in function",sorted)
            setTasks(sorted)
            // console.log("sortedTasks",sortedTasks)
        }
        sortedTasks(sortType)
    // },[sortType, tasksArr.length, tasksObj[singleTask]?.title, tasksObj[singleTask]?.description], tasksObj[singleTask]?.due_date)
},[sortType, tasksArr.length, tasksObj[singleTask]])


    useEffect(()=>{
        dispatch(getTasksThunk())
    }, [dispatch ])



    const handleTaskDisplay = (e) => {
        setSingleTask(e)
        setShowTask(true)
        if(showNewTasks) setShowNewTasks(!showNewTasks)
        if(showEditTasks) setShowEditTasks(!showEditTasks)
    }


    const handleTaskEdit = async (e) => {
        if(showEditTasks) setShowEditTasks(false)
        await setSingleTask(e)
        if(showNewTasks) setShowNewTasks(!showNewTasks)
        if(showTask) setShowTask(false)
        await setShowEditTasks(true)
    }

    const handleNewTask = (e) => {
        setShowNewTasks(!showNewTasks)
        if(showEditTasks) setShowEditTasks(!showEditTasks)
        if(showTask) setShowTask(false)
    }

    const handleTrashClick = async (e) => {
        e.preventDefault()
        setShowEditTasks(false)
    }

    if(!tasksObj) return (<div>Loading</div>)
    // console.log("heres the data ", tasks)
    return(

            <div id='tasks-area-wrapper'>
                <div id="tasks-list">
                    <h1><span className="material-symbols-outlined">task_alt</span>
                    Tasks</h1>
                    {/* <h1>Tasks</h1> */}
                    <br></br>
                    <div id="new-task">
                        <Link onClick={e=>handleNewTask(e)}>New Task</Link>
                    </div>
                    <br></br>
                    <div id="select-filter">
                        <select onChange={(e) => setSortType(e.target.value)}>
                            <option value="due_date">Due Date</option>
                            <option value="created_at">Created Date</option>
                            <option value="title">Title, A-Z</option>
                        </select>
                    </div>
                    {tasksObj && tasks.map(task => {
                        return(
                            <div key={task.id} id='each-task'>
                                <Link onClick={e=> handleTaskDisplay(task.id)} key={task.title} id='task-title'>{task.title}</Link>
                                <p id='task-duedate'key={task.due_date}>Due: {task.due_date.slice(0,16)}</p>
                                {/* <NavLink exact to = {`/tasks/${task.id}/edit`} id="edit_task_link">
                                    Edit task
                                </NavLink> */}
                                <div className='edit-trash'>
                                <Link className= 'edit-button'onClick={e=> handleTaskEdit(task.id)}>Edit Task</Link>
                                <div id="trash" onClick={(e) => handleTrashClick(e)} >
                                    <OpenModalButton
                                    buttonText = "🗑"
                                    modalComponent={<DeleteTaskModal task={task} />}
                                    />
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="task-input-area">
                    {showTask ? <SingleTask taskId={singleTask}/> : null}
                    {showNewTasks ? <CreateTask/> : null}
                    {showEditTasks ? <EditTask taskId={singleTask}/> : null}
                    {/* <SingleTask/> */}
                </div>
            </div>


    )

}

export default CurrentTasks
