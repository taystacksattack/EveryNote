// import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { closeModal } from "../../context/Modal";
import { deleteTaskThunk } from '../../store/tasks'
// import { getTasksThunk } from '../../store/tasks'
// import { useHistory } from "react-router-dom";



const DeleteTaskModal = ({ task }) => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    // const [deleted, setDelete] = useState(false)

    // console.log("task in delete task modal", task)



    const deleteTask = (e) => {
        e.preventDefault();
        dispatch(deleteTaskThunk(task.id))
        // .then(console.log("in the delete task"))
        // .then(history.push('/tasks'))
        // .then(closeModal())
        closeModal()
    }

    return (
        <>
            {task && <div>
                <h2>Confirm Delete</h2>
                <h3>Are you sure you want to delete this task? </h3>
                <div>
                    <button onClick={deleteTask}>Yes (delete task)</button>
                    <button onClick={closeModal}>No (keep task)</button>
                </div>
            </div>}
        </>
    )
}

export default DeleteTaskModal
