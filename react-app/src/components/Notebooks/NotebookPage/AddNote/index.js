import { useHistory } from "react-router-dom"




const AddNoteToNotebook = ({ notebook }) => {

    const history = useHistory()

    // const comingSoon = () => {
    //     window.alert("feature coming soon")
    // }

    const pushPushPush = () => {
        history.push(`/notebooks/${notebook.id}`)
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
