// constants
//GET, CREATE, EDIT, DELETE

//actions
const GET_TASKS = "session/GET_TASKS";
const CREATE_TASK = 'session/CREATE_TASK'
const EDIT_TASK = 'session/EDIT_TASK'
const DELETE_TASK = 'session/DELETE_TASK'
// const REMOVE_USER = "session/REMOVE_USER";


// action collectors
const getTasks = (tasks) => ({
    type: GET_TASKS,
    tasks
});

const createTask = (task) => ({
    type: CREATE_TASK,
    task
});

const editTask = (task) => ({
    type: EDIT_TASK,
    task
});

const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
});


//THUNK action creators
export const getTasksThunk = () => async (dispatch) => {
    const response = await fetch("/api/tasks/");
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}

		dispatch(getTasks(data));
        console.log("RAW", data)
        return data
	}
};

export const createTaskThunk = (task) => async (dispatch) => {
    const response = await fetch('/api/tasks/new', {
        method: 'POST',
        body: task
    })
    console.log('RAW RESPONSE FROM SQLALCHEMY', response)

    if (response.ok){
        const data = await response.json()
        console.log("response ok - new task", data)
        if(data.errors){
            return data.errors
        }
        return null
    } else if (response.status<=200){
        const data = await response.json()
        dispatch(createTask(data))
        return null

    } else{
        return ["An error occurred.Please try again."]
    }
}

export const editTaskThunk = (taskId, task) => async (dispatch) => {
    console.log("taskId in think", taskId)
    console.log("task in think", task)
    console.log(`/api/tasks/${taskId}/edit`)
    // const response = await fetch(`/api/tasks/${task.id}/edit`, {
    //     method: 'PUT',
    //     body: task
    // })
    // console.log('RESPONSE FROM SQLALCHEMY', response)

    try{
        const response = await fetch(`/api/tasks/${taskId}/edit`, {
        method: 'PUT',
        body: task
    })
    const {result} = await response.json()
    console.log("response ok - edited task response", result)
    dispatch(editTask(result))
    return
    } catch(e){
        return e
    }
}

export const deleteTaskThunk = (taskId) => async (dispatch) => {
    try{
        const response = await fetch(`/api/tasks/${taskId}/delete`, {
        method: "DELETE"
    })
    const result = await response.json()
    console.log("result in thunk ",result)
    dispatch(deleteTask(taskId))
    return result
    } catch(e){
        console.log(e)
        return e
    }
}
//THIS IS OUR REDUCER
const initialState = { allTasks: {} };
export default function tasksReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASKS:
            console.log("action",action)
            const newState = { allTasks: {}};
            // console.log("This is the action.tasks...?",action)
            // console.log("IS THIS AN ARRAY?",Array.isArray(action.tasks))
            if(action.tasks.length){
                action.tasks.forEach((task) => {
                    // console.log(task)
                    newState.allTasks[task.id] = task
                })}
            console.log("newstate be like: ", newState)
			return newState;

        case DELETE_TASK:
            const deleteState = {...state, allTasks:{...state.allTasks}} //new all tasks overwrites the old one, causes a hash collision
            console.log("delete state before deletion", deleteState)
            console.log("action.taskId", action.taskId)
            delete deleteState.allTasks[action.taskId]
            console.log("delete state after deletion", deleteState)
            return deleteState
		default:
			return state;
	}
}
