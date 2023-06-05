export const GET_NOTEBOOKS = 'Notebooks/GET_NOTEBOOKS'

// constants
//GET, CREATE, EDIT, DELETE

//actions
// const GET_NOTEBOOKS = "session/GET_NOTEBOOKS";
// const REMOVE_USER = "session/REMOVE_USER";


// action collectors
const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
});


//THUNK action creators
export const getNotebooksThunk = () => async (dispatch) => {
    const response = await fetch("/api/notebooks/");
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        dispatch(getNotebooks(data));
    }
};


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

        default:
            return state;
    }
}

export default notebooksReducer
