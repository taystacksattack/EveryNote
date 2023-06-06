// constants
//GET, CREATE, EDIT, DELETE

//ACTION CONSTANTS
const GET_TAGS = "session/GET_TAGS";
const CREATE_TAG = "session/CREATE_TAG"


//ACTION CREATORS
const getTags = (tags) => ({
    type: GET_TAGS,
    tags
});

const createTag = (tag) => ({
    type: CREATE_TAG,
    tag
})

//THUNKS
export const getTagsThunk = () => async (dispatch) => {
    const response = await fetch("/api/tags/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            console.log("Error in fetching tags")
            return;
        }
        dispatch(getTags(data.tags));
        return data.tags
    }
};

export const createTagThunk = (tag) => async (dispatch) => {
    console.log("\n\n\ntag", tag)
    const response = await fetch("/api/tags/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag)
    })

    if (response.ok) {
        const newTag = await response.json()
        dispatch(createTag(newTag))
        return newTag

    } else {
        const errors = await response.json()
        return errors
    }
}



//REDUCER
const initialState = { allTags: {} };
export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS: {
            const newState = { allTags: {} };

            if (action.tags.length) {
                action.tags.forEach((tag) => {
                    newState.allTags[tag.id] = tag
                })
            }
            return newState.allTags;
        }
        case CREATE_TAG: {
            const newState = { ...state, allTags: { ...state.allTags } }
            console.log('newState', newState)
            console.log('action.tag', action.tag)
            newState.allTags[action.tag.id] = action.tag

            return newState.allTags
        }
        default:
            return state
    }
}
