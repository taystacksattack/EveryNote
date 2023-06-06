import { useDispatch, useSelector,  } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { deleteTaskThunk, getTasksThunk } from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
// import { closeModal } from "../DeleteTaskModal";




const CurrentTasks = () => {
    const dispatch = useDispatch()
    const tasksObj = useSelector(state => state.tasks.allTasks)
    // const [deleting, setDeleting] = useState()
    // const tasksLength = Object.values(tasksObj).length
    useEffect(()=>{
        dispatch(getTasksThunk())
        // dispatch(deleteTaskThunk())
    }, [dispatch, ])

    // console.log("tasksLength", tasksLength)
    console.log("tasks object",tasksObj)

    if(!tasksObj) return (<div>Loading</div>)

    return(
        <div>
            <h1>Tasks</h1>
            <NavLink exact to = '/tasks/new' id="new_task_link">
                New task
            </NavLink>
            {tasksObj && Object.values(tasksObj).map(task => {
                return(
                    <div>
                        <p key={task.id}>{task.title}</p>
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
