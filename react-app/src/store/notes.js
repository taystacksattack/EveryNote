// constants
//GET, CREATE, EDIT, DELETE

//actions
const GET_NOTES = "session/GET_NOTES";
// const REMOVE_USER = "session/REMOVE_USER";


// action collectors
const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
});


//THUNK action creators
export const getNotesThunk = () => async (dispatch) => {
    const response = await fetch("/api/notes/");
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}

		dispatch(getNotes(data.notes));
        console.log("RAW", data.notes)
        return data.notes
	}
};


//THIS IS OUR REDUCER
const initialState = { allNotes: {} };
export default function notesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_NOTES:
            console.log("action",action)
            const newState = { allNotes: {}};

            console.log("what is this...?",action.notes)
            console.log("IS THIS AN ARRAY?",Array.isArray(action.notes))


            if(action.notes.length){
                action.notes.forEach((note) => {
                    newState.allNotes[note.id] = note
                })}
            console.log("newstate be like: ", newState)
			return newState;

		default:
			return state;
	}
}
