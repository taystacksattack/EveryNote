// import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { closeModal } from "../../context/Modal";
import { deleteTaskThunk } from '../../store/tasks'
// import { getTasksThunk } from '../../store/tasks'
// import { useHistory } from "react-router-dom";
import './index.css'


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
            {task && <div className="delete-wrapper">
                <h2>Confirm Delete</h2>
                <h3>Are you sure you want to delete this task? </h3>
                <div className="button-container">
                    <div className="button-div">
                        <button onClick={closeModal} className="delete-cancel">No (keep task)</button>

                    </div>
                    <div className="button-div">
                        <button onClick={deleteTask} className="delete-submit">Yes (delete task)</button>

                    </div>
                </div>
            </div>}
        </>
    )
}

export default DeleteTaskModal
