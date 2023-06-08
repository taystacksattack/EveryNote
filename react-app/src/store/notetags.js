// constants
//GET, CREATE, EDIT, DELETE

//ACTION CONSTANTS
const GET_NOTE_TAGS = "session/GET_NOTE_TAGS"


//ACTION CREATORS
const getNoteTags = (notetags) => ({
    type: GET_NOTE_TAGS,
    notetags
})

//THUNKS

export const getNoteTagsThunk = () => async (dispatch) => {
    // console.log("\n\n\nattempting getNoteTags")


    try {
        const response = await fetch("/api/tags/notetags/");
        const data = await response.json();

        // console.log("\n\n\nwhat is notetags data", data)
        dispatch(getNoteTags(data));

    } catch (e) {
        console.log("Error", e)
    }

    // if (response.ok) {
    //     const data = await response.json();

    //     console.log("\n\n\nwhat is notetags data", data)

    //     if (data.errors) {
    //         console.log("Error in fetching notetags")
    //         return;
    //     }
    //     dispatch(getNoteTags(data.notetags));
    //     return data.notetags
    // }
};

export const addNoteTagThunk = ((noteId, tagId) => async (dispatch) => {
    const response = await fetch(`/api/tags/notetags/${noteId}/${tagId}`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ noteId, tagId})
    })

    if (response.ok) {
        const data = await response.json();
        console.log("ADDNOTE THUNK OK, response", data)
        return data;
    } else {
        const errors = await response.json()
        return errors;
    }
})

export const deleteNoteTagThunk = ((noteId, tagId) => async (dispatch) => {
    const response = await fetch(`/api/tags/notetags/${noteId}/${tagId}`,
    {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ noteId, tagId})
    })

    if (response.ok) {
        const data = await response.json();
        console.log("ADDNOTE THUNK OK, response", data)
        return data;
    } else {
        const errors = await response.json()
        return errors;
    }
})

//REDUCER
const initialState = { notetags: {} };
export default function noteTagsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTE_TAGS: {
            const newState = { notetags: {}}

            // console.log("notetags??", action.notetags)

            if (action.notetags) {
                newState.notetags = action.notetags
                }


            return newState.notetags;
        }
        default:
            return state
    }
}
