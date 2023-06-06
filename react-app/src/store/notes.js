// constants
//GET, CREATE, EDIT, DELETE

//ACTION CONSTANTS
const GET_NOTES = "session/GET_NOTES";
const CREATE_NOTE = "session/CREATE_NOTE"
const GET_NOTE_DETAILS = "session/GET_NOTE_DETAILS"
const EDIT_NOTE = "session/EDIT_NOTE"



//ACTION CREATORS
const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
});

const getNoteDetails = (note) => ({
    type: GET_NOTE_DETAILS,
    note
})


const createNote = (note) => ({
    type: CREATE_NOTE,
    note
})

const editNote = (note) => ({
    type: EDIT_NOTE,
    note
})


//THUNKS
export const getNotesThunk = () => async (dispatch) => {
    const response = await fetch("/api/notes/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getNotes(data.notes));
        return data.notes
    }
};


export const getNoteDetailsThunk = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`)

    if (response.ok) {
        console.log('getNoteDetails response ok')
        const noteDetails = await response.json()
        dispatch(getNoteDetails(noteDetails))
    } else {
        const errors = await response.json()
        return errors
    }

}

export const createNoteThunk = (note) => async (dispatch) => {
    console.log("note =============>", note)
    const response = await fetch("/api/notes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    })

    if (response.ok) {

        const newNote = await response.json()
        dispatch(createNote(newNote))
        return newNote

    } else {

        const errors = await response.json()
        return errors
    }
}

export const editNoteThunk = (note, noteId) => async (dispatch) => {


    console.log('Noteeeeeeeeeeeeeeeee', note)
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        // headers: { "Content-Type": "application/json"},
        // body: JSON.stringify(note)
        body:note
    })

    if (response.ok) {
        console.log('update response ok')
        const updatedNote = await response.json()
        dispatch(editNote(updatedNote))
        return updatedNote
    } else {
        const errors = await response.json()
        return errors
    }

}

//REDUCER
const initialState = { allNotes: {} };
export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTES: {
            const newState = { allNotes: {} };

            if (action.notes.length) {
                action.notes.forEach((note) => {
                    newState.allNotes[note.id] = note
                })
            }

            return newState;
        }
        case GET_NOTE_DETAILS: {
            const newState = { ...state }
            newState.note = action.note
            return newState
        }
        case CREATE_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes } }
            console.log('newState', newState)
            console.log('action.note', action.note)
            newState.allNotes[action.note.id] = action.note
        
            return newState
        }
        case EDIT_NOTE: {
            const newState = { ...state }
            newState.note = action.note
            return newState
        }
        default:
            return state
    }
}
