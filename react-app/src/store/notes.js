// constants
//GET, CREATE, EDIT, DELETE

//ACTION CONSTANTS
const GET_NOTES = "session/GET_NOTES";
const CREATE_NOTE = "session/CREATE_NOTE"
const EDIT_NOTE = "session/EDIT_NOTE"
const DELETE_NOTE = "session/DELETE_NOTE"
const CLEAR_NOTES = "session/CLEAR_NOTES"


//ACTION CREATORS
const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
});


const createNote = (note) => ({
    type: CREATE_NOTE,
    note
})

const editNote = (note) => ({
    type: EDIT_NOTE,
    note
})

const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    noteId
})


export const clearNotes = () => ({
    type: CLEAR_NOTES
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



export const createNoteThunk = (note) => async (dispatch) => {
    // console.log("note =============>", note)
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


    // console.log('Noteeeeeeeeeeeeeeeee', note)
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(note)

    })

    if (response.ok) {
        // console.log('update response ok')
        const updatedNote = await response.json()
        dispatch(editNote(updatedNote))
        return updatedNote
    } else {
        const errors = await response.json()
        return errors
    }

}

export const deleteNoteThunk = (noteId) => async (dispatch) => {

    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        // console.log('delete rsponse ok')
        dispatch(deleteNote(noteId))
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

        case CREATE_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes } }
            // console.log('newState', newState)
            // console.log('action.note', action.note)
            newState.allNotes[action.note.id] = action.note

            return newState
        }
        case EDIT_NOTE: {
            const newState = { ...state }
            newState.allNotes[action.note.id] = action.note
            return newState
        }
        case DELETE_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes}}
            delete newState.allNotes[action.noteId]
            return newState
        }
        case CLEAR_NOTES: {
            return { allNotes:{} }
        }
        default:
            return state
    }
}
