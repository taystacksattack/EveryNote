import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
// import { getNotesThunk } from "../../store/notes"


const SingleNote = () => {
    // const dispatch = useDispatch()

    // const notesObj = useSelector(state => state.notes.allNotes)

    // useEffect(()=>{
    //     dispatch(getNotesThunk())
    // }, [dispatch, ])

    // console.log("notes object",notesObj)
    // if(!notesObj) return (<div>Loading</div>)

    // return(
    //     <div>
    //         <h1>Notes</h1>
    //         {notesObj && Object.values(notesObj).map(note => {
    //            return(
    //             <p key={note.id}>{note.title}</p>
    //             )
    //         })}

    //     </div>

    // )
    return (
        <div>Single NOTE!!!</div>
    )

}

export default SingleNote
