import { useSelector  } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { editTaskThunk, getTasksThunk } from '../../store/tasks';
// import { useHistory, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import '../TasksPage/TasksPage.css'

// const dateConvertor = (time) =>{
//     // console.log(new Date(time).getTime())
//     // time = new Date(time).getTime() + new Date(time).getTimezoneOffset()
//     // console.log(time)
//     const year= new Date(time).getFullYear()
//     let month = new Date(time).getMonth() + 1 //need to add one to account for python using zero indexes in months
//     let date = new Date(time).getDate()

//     if ( month.toString().length === 1) month = "0" + month.toString()
//     if ( date.toString().length === 1) date = "0" + date.toString()
//     // console.log("in date convertor" , `${year}-${month}-${date}`)
//     return `${year}-${month}-${date}`
// }


const SingleTask = ({taskId}) =>{
    // console.log("task in single task component", taskId)
    // const {taskId} = useParams()
    const task = useSelector(state => state.tasks.allTasks[taskId])



    //`${new Date(task?.due_date).getFullYear()}-${new Date(task?.due_date).getMonth()}-${new Date(task?.due_date).getDate()}`
    // const currentUser = useSelector((state => state.userState.currentUser))
    // const dispatch = useDispatch()
    // const history = useHistory()


    return (
        <div className="form-page">
            {task &&
            <div className="form-container">
                <h1>{task.title}</h1>
                <br></br>
                 <div id="">
                    <p>{task.description}</p>
                    <br></br>
                    <p>Due: {task.due_date.slice(0,16)}</p>
                    <p>Completed? {task.completed ? "Yes!": "Not yet"}</p>
                </div>
            </div>}
        </div>
    )




}

export default SingleTask
