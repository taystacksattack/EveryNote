import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
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
            {tasksObj && Object.values(tasksObj).map(task => {
               return(
                <p key={task.id}>{task.title}</p>
                )
            })}

        </div>

    )

}

export default CurrentTasks
