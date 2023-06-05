import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { getTasksThunk } from "../../store/tasks"



const CurrentTasks = () => {
    const dispatch = useDispatch()

    const tasksObj = useSelector(state => state.tasks.allTasks)

    useEffect(()=>{
        dispatch(getTasksThunk())
    }, [dispatch, ])

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
                        <NavLink exact to = {`/tasks/${task.id}/delete`} id="delete_task_link">
                            Delete task
                        </NavLink>
                    </div>
                )
            })}

        </div>

    )

}

export default CurrentTasks
