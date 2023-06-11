export const GET_NOTEBOOKS = 'Notebooks/GET_NOTEBOOKS'
export const CREATE_NOTEBOOK = 'Notebooks/CREATE_NOTEBOOK'
export const EDIT_NOTEBOOK = 'Notebooks/EDIT_NOTEBOOK'
export const DELETE_NOTEBOOK = 'Notebooks/DELETE_NOTEBOOK'
const CLEAR_NOTEBOOKS = "Notebooks/CLEAR_NOTEBOOKS"
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

export const clearNotebooks = () => ({
    type: CLEAR_NOTEBOOKS
})

//THUNK action creators
//CREATE
export const createNotebooksThunk = (notebook) => async (dispatch) => {
    const response = await fetch("/api/notebooks/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notebook)
    })
    if (response.ok) {
        const data = await response.json();

        dispatch(createNotebook(data))
    }
}
// GET
export const getNotebooksThunk = () => async (dispatch) => {
    const response = await fetch("/api/notebooks/");
    if (response.ok) {
        const data = await response.json();
        dispatch(getNotebooks(data));
    }
};
// EDIT - Done
export const editNotebookThunk = (notebook) => async (dispatch) => {
    const id = notebook.id
    try {
        const response = await fetch(`/api/notebooks/${id}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notebook)
        })

        if (response.ok) {
            const data = await response.json()
            dispatch(editNotebook(data))
        }
    } catch (error) {
        return error
    }
}
// Delete
export const deleteNotebookThunk = (notebook) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebook.id}/delete`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteNotebook(notebook))
    }
}

//THIS IS OUR REDUCER
const initialState = { allNotebooks: {} };
const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
            const getState = { ...state, allNotebooks: { ...state.allNotebooks } };
            if (action.notebooks.length !== 0) {
                action.notebooks.notebooks.forEach((notebook) => {
                    getState.allNotebooks[notebook.id] = notebook
                })
            }
            return getState;
        case CREATE_NOTEBOOK:
            const createState = { ...state, allNotebooks: { ...state.allNotebooks } }
            createState.allNotebooks[action.notebook.id] = action.notebook

            return createState
        case EDIT_NOTEBOOK:
            const editState = { ...state, allNotebooks: { ...state.allNotebooks } }
            editState.allNotebooks[action.notebook.id] = action.notebook

            return editState
        case DELETE_NOTEBOOK:
            const deleteState = { ...state, allNotebooks: { ...state.allNotebooks } }
            delete deleteState.allNotebooks[action.notebook.id]
            return deleteState
        case CLEAR_NOTEBOOKS: {
            return { allNotebooks: {}}
        }
        default:
            return state;
    }
}

export default notebooksReducer
