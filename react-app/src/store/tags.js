// constants
//GET, CREATE, EDIT, DELETE

//ACTION CONSTANTS
const GET_TAGS = "session/GET_TAGS";
const CREATE_TAG = "session/CREATE_TAG"
// const DELETE_TAG = "session/DELETE_TAG"


//ACTION CREATORS
const getTags = (tags) => ({
    type: GET_TAGS,
    tags
});

const createTag = (tag) => ({
    type: CREATE_TAG,
    tag
})

// const deleteTag = (tag) => ({
//     type: DELETE_TAG,
//     tag
// })

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
        body: tag
        // body: JSON.stringify(tag)
    })

    if (response.ok) {
        const newTag = await response.json()
        dispatch(createTag(newTag))
        return newTag

    } else {
        const errors = await response.json()
        return errors
    }
};

export const deleteTagThunk = (tagId) => async(dispatch) => {
    console.log("at delete tag thunk");
    console.log("tagId", tagId)
    const response = await fetch(`api/tags/${tagId}`, {
        "method": "DELETE"
    });

    const res = await response.json();
    console.log(res);
    return res;
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
            const newState = { ...state }
            // const newState = { ...state, allTags: { ...state.allTags } }
            // console.log('newState', newState)
            // console.log('action.tag', action.tag)
            newState[action.tag.id] = action.tag
            // console.log("added", newState[action.tag.id])
            // console.log("allTags", newState)
            return newState;
        }
        default:
            return state
    }
}
