



const AddNoteToNotebook = () => {

    const comingSoon = () => {
        window.alert("feature coming soon")
    }

    return (
        <div onClick={(e) => comingSoon()} className="add-note-feature">
            Add note
        </div>

    )
}

export default AddNoteToNotebook
