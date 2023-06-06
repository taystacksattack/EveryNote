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
    console.log("\n\n\nattempting getNoteTags")

    const response = await fetch("/api/tags/notetags/");

    try {
        const data = await response.json();

        console.log("\n\n\nwhat is notetags data", data)
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


//REDUCER
const initialState = { notetags: {} };
export default function noteTagsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTE_TAGS: {
            const newState = { notetags: {}}
            if (action.notetags.length) {
                action.notetags.forEach((notetag) => {
                    newState.notetags[notetag.id] = notetag
                })
            }
            //return newState.notetags?
            return newState.notetags;
        }
        default:
            return state
    }
}
