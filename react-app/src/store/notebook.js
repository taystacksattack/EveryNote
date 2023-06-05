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
	if (response.ok) {
        const data = await response.json();

		dispatch(getNotebooks(data));
	}
};


//THIS IS OUR REDUCER
const initialState = { allNotebooks: {} };
export default function notebooksReducer(state = initialState, action) {
	switch (action.type) {
		case GET_NOTEBOOKS:
            // console.log("action",action)
            const newState = { allNotebooks: {}};

            // console.log("what is this...?",action.notebooks)
            // console.log("IS THIS AN ARRAY?",Array.isArray(action.notebooks))


            if(action.notebooks.length){
                action.notebooks.forEach((notebook) => {
                    newState.allNotebooks[notebook.id] = notebook
                })}
            // console.log("newstate be like: ", newState)
			return newState;

		default:
			return state;
	}
}
