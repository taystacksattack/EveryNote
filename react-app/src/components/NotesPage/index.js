import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getNotesThunk, createNoteThunk, editNoteThunk } from "../../store/notes"
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "./deleteNoteModal"
import { deleteTagThunk, getTagsThunk } from "../../store/tags"
import { getNoteTagsThunk, addNoteTagThunk, deleteNoteTagThunk } from "../../store/notetags"

import "./notespage.css"

const CurrentNotes = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [trash, setTrash] = useState(false)
    const [clickedNote, setClickedNote] = useState({})
    const [clickedAdd, setClickedAdd] = useState(false)
    const [sortDate, setSortDate] = useState(false)
    const [sortAlpha, setSortAlpha] = useState(false)
    const [listRendered, setListRendered] = useState([])

    //josh stuff
    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);
    const [renderSwitch, setRenderSwitch] = useState(true)
    //

    const notesObj = useSelector(state => state.notes.allNotes)
    const owner = useSelector(state => state.session.user)


  
    const listOfNotes = Object.values(notesObj).filter(note => note.trash === false)
    
 

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
        setListRendered(listOfNotes)

    }, [dispatch, listOfNotes.length, listRendered.length, notesObj[clickedNote.id]?.title, notesObj[clickedNote.id]?.body])

    useEffect(() => {
        dispatch(getTagsThunk())
        dispatch(getNoteTagsThunk())
    }, [dispatch])


    useEffect(() => {
        setClickedNote({})
        setTitle('')
        setNoteContent('')
    }, [listOfNotes.length, clickedAdd])





    // console.log('list of notes', listOfNotes)




    const azSort = (notesList) => {
        const copy = notesList.slice()
        const sortedCopy = copy.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()

            if (titleA < titleB) return -1
            if (titleA > titleB) return 1
            return 0
        })
        return sortedCopy
    }

    const dateSort = (notesList) => {
        const copy = notesList.slice()
        const sortedCopy = copy.sort((a, b) => {
            const dateA = a.updated_at
            const dateB = b.updated_at
            return new Date(dateA) - new Date(dateB)
        })
        return sortedCopy
    }


    const handleSortAlpha = () => {
        setSortAlpha(!sortAlpha)
        if (sortAlpha === true) setListRendered(azSort(listOfNotes))
        if (sortAlpha === false) setListRendered(azSort(listOfNotes).toReversed())
    }

    const handleSortDate = () => {
        setSortDate(!sortDate)
        if (sortDate === true) setListRendered(dateSort(listOfNotes))
        if (sortDate === false) setListRendered(dateSort(listOfNotes).toReversed())
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(clickedNote).length > 0) {
            console.log("updatingggggggggggg", title, noteContent)
            console.log("note info", clickedNote)


            const updatedNote = {
                title,
                body: noteContent,

            }

            await dispatch(editNoteThunk(updatedNote, clickedNote.id))
            await dispatch(getNotesThunk())
            setListRendered(listOfNotes)
            setTitle('')
            setNoteContent('')
        } else {

            await dispatch(createNoteThunk(newNote))
            setTitle('')
            setNoteContent('')

            await dispatch(getNotesThunk())

        }

    }
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


    // josh stuff//////////////////


    function noteTest(noteId) {
        try {
            const currentNote = allnotes.allNotes[noteId]
            const currentNoteTags = notetags.note_to_tags[noteId]

            console.log("\n\n\nNOTE TEST CURRENT NOTE, ", currentNote)
            console.log("CURRENT NOTE TAGS", currentNoteTags)

            return (
                <>
                <div>
                    NOTE TEST, with NOTE {noteId}
                </div>
                <div>id: {currentNote.id}</div>
                <div>title: {currentNote.title}</div>
                <div>preview: {currentNote.body.slice(0, 25)}...</div>
                <br></br>
                <div>TAGS:</div>
                {currentNoteTags && currentNoteTags.map((tagId) => {
                    return (
                        <>
                        <a href="/tags">
                        <span id='tag-names'>{tagId}: {alltags[tagId].name}</span>
                        </a>
                        <button onClick={()=> removeTagFromNote(currentNote.id, tagId)}>(remove this tag)</button>

                        </>
                        )
                })}
                </>
            )
        } catch {}

    }

    async function removeTagFromNote(noteId, tagId) {

        console.log("remove tag from note")
        return dispatch(deleteNoteTagThunk(noteId, tagId))
        .then(() => setRenderSwitch(!renderSwitch))
        .catch(async (res) => {
            console.log("errors?", res)
        })
    }


/////////////////////////






    if (!notesObj) return (<div>Loading</div>)
    return (
        <div className='everything-wrapper'>
            <div className='all-notes-area'>
                <div className='notes-header'>
                    <h1><span id='note-icon' className="material-symbols-outlined">description</span>Notes</h1>
                    <span id='add-note-icon' className="material-symbols-outlined" onClick={(e) => setClickedAdd(!clickedAdd)} >
                        add_notes
                    </span>
                </div>
                <div className="notes-subheading">
                    {<span className='note-tally'>{listOfNotes.length} notes</span>}
                    <div className='sorting-icons'>
                        <span id='alpha-sort-icon' className="material-symbols-outlined"
                            onClick={(e) => handleSortAlpha()}

                        >
                            sort_by_alpha
                        </span>
                        <span id='date-sort-icon' className="material-symbols-outlined"
                            onClick={(e) => handleSortDate()}>
                            sort
                        </span>

                    </div>
                </div>

                {notesObj && !listRendered ? listOfNotes.toReversed().map(note => (
                    <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                        <p className='note-titles'>{note.title}</p>
                        <p>{note.updated_at.split('.')[0]}</p>
                        
                        {noteTest(note.id)}
                        
                        <div id="delete-note-modal-container">
                            <OpenModalButton
                                buttonText="Trash"
                                modalComponent={<DeleteModal note={note} />}
                            />
                        </div>
                    </div>
                ))
                    : listRendered.map(note => (
                        <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                            <p id='note-titles'>{note.title}</p>
                            <p>{note.updated_at.split('.')[0]}</p>

                            
                            {noteTest(note.id)}

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
