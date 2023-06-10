import { useHistory } from "react-router-dom"




const AddNoteToNotebook = () => {

    const history = useHistory()

    // const comingSoon = () => {
    //     window.alert("feature coming soon")
    // }

    const pushPushPush = () => {
        history.push("/notebooks/1")
    }

    return (
        // <div onClick={(e) => comingSoon()} className="add-note-feature">
        //     Add note
        // </div>
        <div onClick={(e) => pushPushPush()} className="add-note-feature">
            Add note
        </div>

    )
}

export default AddNoteToNotebook
