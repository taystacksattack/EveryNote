export const GET_NOTEBOOKS = 'Notebooks/GET_NOTEBOOKS'
export const CREATE_NOTEBOOK = 'Notebooks/CREATE_NOTEBOOK'
export const EDIT_NOTEBOOK = 'Notebooks/EDIT_NOTEBOOK'
export const DELETE_NOTEBOOK = 'Notebooks/DELETE_NOTEBOOK'
//GET, CREATE, EDIT, DELETE

//actions
//CREATE
const createNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    notebook
})
// GET
const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
});
// EDIT
const editNotebook = (notebook) => ({
    type: EDIT_NOTEBOOK,
    notebook
})
// Delete
const deleteNotebook = (notebook) => ({
    type: DELETE_NOTEBOOK,
    notebook
})

//THUNK action creators
//CREATE
export const createNotebooksThunk = (notebook) => async (dispatch) => {
    console.log("create thunk:", notebook)
    const response = await fetch("/api/notebooks/new", {
        method: "Post",
        body: notebook
    })
    // console.log(response)
    if (response.ok) {
        const data = await response.json();

        dispatch(createNotebook(data))
    }
}
// GET
export const getNotebooksThunk = () => async (dispatch) => {
    const response = await fetch("/api/notebooks/");
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        dispatch(getNotebooks(data));
    }
};
// EDIT
export const editNotebookThunk = (notebook) => async (dispatch) => {
    console.log("editNotebookThunk:", notebook)
    const response = await fetch(`/api/notebooks/${notebook.id}/edit`, {
        method: "PUT",
        body: notebook
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editNotebook(data))
    }
}
// Delete
export const deleteNotebookThunk = (notebook) => async (dispatch) => {
    const response = await fetch(`1/api/notebooks/${notebook.id}delete`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteNotebook(notebook.id))
    }
}

//THIS IS OUR REDUCER
const initialState = { allNotebooks: {} };
const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
            const newState = { allNotebooks: {} };
            // console.log("action.notebooks:", action.notebooks)
            if (action.notebooks.length !== 0) {
                action.notebooks.notebooks.forEach((notebook) => {
                    newState.allNotebooks[notebook.id] = notebook
                })
            }
            return newState;
        case CREATE_NOTEBOOK:
            console.log("action.notebook:", action.notebook)
            return { ...state, allNotebooks: action.notebook }
        case EDIT_NOTEBOOK:
            return { ...state, allNotebooks: action.notebook }
        default:
            return state;
    }
}

export default notebooksReducer
