import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
import { getNotesThunk, createNoteThunk, editNoteThunk } from "../../store/notes"
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "./deleteNoteModal"
import "./notespage.css"

const CurrentNotes = () => {

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [trash, setTrash] = useState(false)
    const [clickedNote, setClickedNote] = useState({})
    const [sortStatus, setSortStatus] = useState(false)
    const [sortAlpha, setSortAlpha] = useState(false)

    const dispatch = useDispatch()
    const notesObj = useSelector(state => state.notes.allNotes)
    const owner = useSelector(state => state.session.user)


    // notebookId hardcoded for now, gotta remember to make it dynamic later
    const newNote = {
        title,
        body: noteContent,
        ownerId: owner.id,
        notebookId: 1,
        trash: trash

    }
    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])


    //FOR IF I WANT TRASH STORAGE IMPLEMENTATION LATER
    // useEffect(() => {
    //     if (trash === true) {

    //         dispatch(createNoteThunk(newNote))
    //         setTitle('')
    //         setNoteContent('')
    //     }
    // }, [dispatch, trash])



    const handleNoteClick = async (note) => {
        setTitle(note.title)
        setNoteContent(note.body)
        setClickedNote(note)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(clickedNote).length > 0) {
            console.log("updatingggggggggggg", title, noteContent)
            console.log("note info", clickedNote)

            // console.log("updatingggggggggggg", title, noteContent)
            // console.log("note info", clickedNote)
            // const updatedDate = Date.now()

            const updatedNote = {
                title,
                body: noteContent,

            }



            await dispatch(editNoteThunk(updatedNote, clickedNote.id))
            dispatch(getNotesThunk())
            setTitle('')
            setNoteContent('')
        } else {

            dispatch(createNoteThunk(newNote))
            setTitle('')
            setNoteContent('')
        }

    }
    const listOfNotes = Object.values(notesObj).filter(note => note.trash === false)

    console.log('list of notes', listOfNotes)

    let listRendered = listOfNotes.slice();


    if (sortStatus === false) {
        listRendered = listRendered.reverse()
    }


    const azSort = (notesList) => {
        const copy = listOfNotes.slice()
        const sortedCopy = copy.sort((a,b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()

            if (titleA < titleB) return -1
            if (titleA > titleB) return 1
            return 0
        })
        return sortedCopy
    }


    if (sortAlpha === true) {
        listRendered = azSort(listRendered.reverse())
    }

    // if (sortAlpha === false) {
    //     listRendered = azSort(listRendered)

    // }

    if (!notesObj) return (<div>Loading</div>)

    return (
        <div className='everything-wrapper'>
            <div className='all-notes-area'>

                <h1><span id='note-icon' className="material-symbols-outlined">description</span>Notes</h1>

                <div className="notes-subheading">
                    <span>{listOfNotes.length} notes</span>
                    <div className='sorting-icons'>
                        <span id='alpha-sort-icon' className="material-symbols-outlined"
                        onClick={(e) => {
                            console.log('alphaStatus', sortAlpha)
                            return setSortAlpha(!sortAlpha)}
                        }
                        >
                            sort_by_alpha
                        </span>
                        <span id='date-sort-icon' className="material-symbols-outlined"
                            onClick={(e) => {
                                console.log('sortStatus', sortStatus)
                                return setSortStatus(!sortStatus)
                            }}>
                            sort
                        </span>

                    </div>
                </div>

                {notesObj && listRendered.map(note => (
                    <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                        <p >{note.title}</p>
                        <p>{note.updated_at.split('.')[0]}</p>
                        <div id="delete-note-modal-container">
                            <OpenModalButton
                                buttonText="Trash"
                                modalComponent={<DeleteModal note={note} />}
                            />
                        </div>
                    </div>
                ))

                }


            </div>

            <div className='new-note-area'>
                <form id='new-note-form' onSubmit={handleSubmit} method={Object.values(clickedNote).length ? "PUT" : "POST"}>

                    <textarea
                        id='title-textarea'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    >
                    </textarea>
                    <textarea
                        id='note-content-textarea'
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder='Start writing'
                        rows='50'
                    >
                    </textarea>
                    <button type='submit' id='save-note-btn'>Save Note</button>

                </form>
                {/* FOR IF I WANT TRASH STORAGE INSTEAD OF IMMEDIATE DELETION LATER*/}
                {/* <button onClick={(e) => setTrash(!trash)}>trash</button> */}

            </div>


        </div>
    )

}

export default CurrentNotes
