import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState,  } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { deleteTaskThunk, getTasksThunk } from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
// import { closeModal } from "../DeleteTaskModal";




const CurrentTasks = () => {
    const dispatch = useDispatch()

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('due');

    let tasksObj = useSelector(state => state.tasks.allTasks)
    // tasksObj = tasksObj.allTasks //total bandaid.


    // console.log("tasksLength", tasksLength)
    const tasksArr = Object.values(tasksObj)
    // console.log("tasks array",tasksArr)
    // useEffect(()=>{
    //     const sortedTasks = type => {
    //         const types = {
    //             due: 'due_date',
    //             created: 'created_at',
    //             // titled: 'title'
    //         }
    //         const sortProperty = types[type]
    //         const sorted = [...tasksArr].sort((a, b) =>{
    //             return new Date(a[sortProperty]) - new Date (b[sortProperty])
    //         });
    //         console.log("sorted stuff in function",sorted)
    //         setData(sorted)
    //         console.log("data",data)
    //     }
    //     sortedTasks(sortType)
    // },[sortType, tasksArr.length])

    useEffect(()=>{
        dispatch(getTasksThunk())
    }, [dispatch, ])

    if(!tasksObj) return (<div>Loading</div>)
    console.log("heres the data ", data)
    return(
        <div>
            <h1>Tasks</h1>
            <NavLink exact to = '/tasks/new' id="new_task_link">
                New task
            </NavLink>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="due">Due Date</option>
                <option value="created">Created Date</option>
                {/* <option value="titled">Title, A-Z</option> */}
            </select>
            {tasksObj && tasksArr.map(task => {
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
