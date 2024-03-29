
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getNotesThunk, createNoteThunk, editNoteThunk } from "../../store/notes"
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "./deleteNoteModal"
import { getTagsThunk } from "../../store/tags"
// import { deleteTagThunk } from "../../store/tags"
import { getNoteTagsThunk, addNoteTagThunk, deleteNoteTagThunk } from "../../store/notetags"

//josh, get notebooks
import { getNotebooksThunk } from "../../store/notebook"

import "./notespage.css"

const CurrentNotes = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    // const [trash, setTrash] = useState(false)
    const [clickedNote, setClickedNote] = useState({})
    const [clickedAdd, setClickedAdd] = useState(false)
    const [sortDate, setSortDate] = useState(false)
    const [sortAlpha, setSortAlpha] = useState(false)
    const [listRendered, setListRendered] = useState([])
    const [errors, setErrors] = useState({})

    //josh stuff
    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);

    const allnotebooks = useSelector(state => state.notebooks.allNotebooks);


    const [renderSwitch, setRenderSwitch] = useState(true)
    const [tagIdChoice, setTagIdChoice] = useState();

    const [notebookIdChoice, setNotebookIdChoice] = useState(1);
    //
    // final edit stuff
    const [showSaved, setShowSaved] = useState(false)
    const [deleteNoteState, setDeleteNoteState] = useState(false)



    const notesObj = useSelector(state => state.notes.allNotes)
    const owner = useSelector(state => state.session.user)

    const listOfNotes = Object.values(notesObj).filter(note => note.trash === false)

    ////working on this


    //////


    // notebookId hardcoded for now, gotta remember to make it dynamic later

    // console.log("creating new note, notebookIdChoice", notebookIdChoice);


    useEffect(() => {
        dispatch(getNotesThunk())
        setListRendered(dateSort(listOfNotes).toReversed())
        // setSortDate(false)


    }, [dispatch, listOfNotes.length, listRendered.length, notesObj[clickedNote.id]?.title, notesObj[clickedNote.id]?.body])
    // useEffect(() => {
    //     dispatch(getNotesThunk())
    //     setListRendered(listOfNotes)

    // }, [dispatch, listOfNotes.length, listRendered.length, notesObj[clickedNote.id]?.title, notesObj[clickedNote.id]?.body])

    useEffect(() => {
        dispatch(getTagsThunk())
        dispatch(getNoteTagsThunk())

        dispatch(getNotebooksThunk())
        //resets on each add
        setTagIdChoice('')
        setNotebookIdChoice(1)

    }, [dispatch, renderSwitch])


    useEffect(() => {
        setClickedNote({})
        setTitle('')
        setNoteContent('')
    }, [clickedAdd, deleteNoteState])





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
        const copy = notesList
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

        const newNote = {
            title,
            body: noteContent,
            ownerId: owner?.id,
            // notebookId: 1,
            notebookId: notebookIdChoice,
            //
            trash: false

        }

        setErrors({})

        const newErrors = {}
        if (title.length > 30) newErrors.title = 'Please keep title less than 30 characters.'
        if (noteContent.length > 2500) newErrors.noteContent = 'Please keep note less than 2500 characters.'
        if (!title.length && !noteContent.length) newErrors.note = "Cannot create an empty note"

        if (Object.values(newErrors).length) {
            setErrors(newErrors)
            return null
        } else if ((Object.values(clickedNote).length > 0) ||
                    clickedNote.notebookId && clickedNote.notebookId !== notebookIdChoice) {
        // } else if (Object.values(clickedNote).length > 0) {

            // console.log("updatingggggggggggg", title, noteContent)
            // console.log("note info", clickedNote)

            // console.log("clickedNote notebookId", clickedNote.notebookId)
            // console.log("notebookIdChoice", notebookIdChoice)

            const updatedNote = {
                title,
                body: noteContent,

                //07-18, work
                notebookId: notebookIdChoice

            }

            //console.log("updating note, updated notebookId", notebookIdChoice)



            await dispatch(editNoteThunk(updatedNote, clickedNote.id))
            dispatch(getNotesThunk())
            setListRendered(listOfNotes.toReversed())
            // setTitle('')
            // setNoteContent('')

            setShowSaved(true)
            setTimeout(()=>{
                setShowSaved(false)
            }, 3000)

            //
            // setNotebookIdChoice(1)
            // setClickedNote({})
            // dispatch(getNotesThunk())
        } else {

            const tempNote = await dispatch(createNoteThunk(newNote))
            // console.log("tempNote id!",tempNote.id)
            // setTitle('')
            // setNoteContent('')
            //
            // setNotebookIdChoice(1)

            setClickedNote(tempNote)
            setShowSaved(true)
            setTimeout(()=>{
                setShowSaved(false)
            }, 3000)


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
        setErrors({})

        // // /* josh */
        setTagIdChoice('')
        setNotebookIdChoice(note.notebookId)

    }

    //add tag stuff
    function AddTagForm(noteId) {
        const dispatch = useDispatch();
        //   const [noteIdChoice, setNoteIdChoice] = useState("");

        //07-17 rendered more hooks error; try moving to top of doc
        //const [tagIdChoice, setTagIdChoice] = useState();

        //07-17 test, don't display on new note
        //clickedNote ? console.log("clickedNOte, ", clickedNote) : console.log("No current clickedNote");

        // const alltags = useSelector(state => state.tags);
        // const allnotes = useSelector(state => state.notes);
        // const notetags = useSelector(state => state.notetags);

        // useEffect(() => {
        //     console.log("current tagID Choice!", tagIdChoice)
        // })

        try {

            // const currentNote = allnotes.allNotes[noteId]
            // const tagsOfCurrentNote = notetags.note_to_tags[noteId]
            const tagsOfCurrentNote = notetags.note_to_tags[noteId] ? notetags.note_to_tags[noteId] : []

            const allTagsValues = Object.values(alltags);
            const allTagsList = allTagsValues.map((tag) => { return { "id": tag.id, "name": tag.name } })

            const availableTags = allTagsList.filter((val) => tagsOfCurrentNote.indexOf(val.id) === -1)



            // console.log("\n\n\n\nADDTAGNOTEFORM CURRENTNOTE??", currentNote)
            // console.log("ADDTAGNOTEFORM TAGS OF CURRENTNOTE??", tagsOfCurrentNote)
            // console.log("ALLTAGS VALUES???", allTagsValues)
            // console.log("ALLTAGS LIST???", allTagsList)
            // console.log("UNIQUE TAGS??", availableTags)


            const handleSubmitAddTag = async (e) => {
                e.preventDefault();

                if (tagIdChoice == '') {
                    // console.log('ignoring, no selection');
                    return;
                }

                setRenderSwitch(!renderSwitch);
                await dispatch(addNoteTagThunk(noteId, tagIdChoice));

                // setTagIdChoice(0);
            };

            return (
                <>
                    <div id='add-tag-instruction'>Add Tag to Current Note</div>
                    <form action='' onSubmit={handleSubmitAddTag}>
                        {/* <label>
                Tag
                <input
                  type="text"
                  value={"value"}
                  onChange={(e) => setTagIdChoice(e.target.value)}
                  required
                />
              </label> */}
                        <label>
                            <select className ='tag-selections'name="tagId"
                                onChange={(e) => {
                                    setTagIdChoice(e.target.value)
                                }
                            }
                            //new addition, should reset to -select- on add
                            value={tagIdChoice}

                            >


                                {/* MAP: option value=tagID, label tag_name */}
                                <option value={''}>-Select Tag-</option>
                                {/* <option value={""} selected="selected">-Select Tag-</option> */}


                                {availableTags.map((tagNamePair) => (
                                    <option value={tagNamePair.id}

                                    // selected = { tagNamePair.id == 5 ? true : false}
                                    >{tagNamePair.name}</option>
                                ))}

                            </select>

                        </label>
                        {/* <div id="add-tag-button"> */}
                            <button id="add-tag-button" onClick={handleSubmitAddTag}>Add Tag </button>
                        {/* </div> */}
                    </form>
                </>
            );

        } catch(e) {
            console.log('errors', e)
            return (<></>)
        }
    }

    //


    function AddToNotebookForm() {
        //console.log("attempting add to notebook")
        try {

            // const currentNoteNotebookId = clickedNote ? clickedNote.id : 1;
            // const noteValues = Object.values(notesObj);
            const notebookValues = Object.values(allnotebooks);

            //notebookIdChoice

            return (
                <>
                    <div id='set-notebook-instruction'>Set Notebook</div>
                    <form action=''>
                    {/* <form action='' onSubmit={handleSubmitAddTag}> */}

                        <label>
                            <select className='tag-selections'
                                    name="notebookId"
                                    onChange={(e) => {
                                        setNotebookIdChoice(e.target.value)
                                    }
                            }
                            //new addition, should reset to -select- on add
                            value={notebookIdChoice}

                            >
                                {notebookValues.map((notebook) => (
                                    <option value={notebook.id}>
                                        {notebook.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </form>
                </>
            );

        } catch(e) {
            console.log('add notebook errors', e)
            return (<>Nothing</>)
        }
    }




    // josh stuff//////////////////


    function noteTest(noteId) {
        try {
            const currentNote = allnotes.allNotes[noteId]
            const currentNoteTags = notetags.note_to_tags[noteId] ? notetags.note_to_tags[noteId] : []

            // console.log("\n\n\nNOTE TEST CURRENT NOTE, ", currentNote)
            // console.log("CURRENT NOTE TAGS", currentNoteTags)

            return (
                <>
                    {/* <div>
                    NOTE TEST, with NOTE {noteId}
                </div>
                <div>id: {currentNote.id}</div>
                <div>title: {currentNote.title}</div>
                <div>preview: {currentNote.body.slice(0, 25)}...</div>
                <br></br> */}
                    {/* <div>TAGS:</div> */}
                    <br></br>
                    {currentNoteTags && currentNoteTags.map((tagId) => {
                        return (
                            <>
                                <div className="tag-button">
                                    <div>
                                        <span id='tag-names'>{`${alltags[tagId].name} `}</span>
                                    </div>
                                    <span onClick={() => removeTagFromNote(currentNote.id, tagId)}><i className="fa-solid fa-circle-xmark"></i></span>
                                </div>
                            </>
                        )
                    })}
                </>
            )
        } catch { }

    }

    async function removeTagFromNote(noteId, tagId) {

        // console.log("remove tag from note")
        return dispatch(deleteNoteTagThunk(noteId, tagId))

            .then(() => setRenderSwitch(!renderSwitch))
            .catch(async (res) => {
                // console.log("errors?", res)
            })

    }


    /////////////////////////






    // console.log("deletenote state - is this defined?", deleteNoteState)
    // console.log("set deletenote state - is this defined?", setDeleteNoteState)

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

                <div>
                    {notesObj && !listRendered ? listOfNotes.toReversed().map(note => (
                        <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                            <p id='note-titles'>{note.title}</p>
                            <p id='updated-date'>{note.updated_at.split('.')[0]}</p>

                            {noteTest(note.id)}

                            <div id="delete-note-modal-container">
                                <OpenModalButton
                                    buttonText='🗑'
                                    modalComponent={<DeleteModal note={note} setDeleteNoteState={setDeleteNoteState} deleteNoteState={deleteNoteState} />}
                                />
                            </div>
                        </div>
                    ))

                        : listRendered.map(note => (
                            <div key={note.id} className='note-selection' onClick={() => handleNoteClick(note)}>
                                <div id="whole-note-data-wrapper">
                                    <div id="note-data-wrapper">

                                        <p id='note-titles'>{note.title}</p>
                                        <p id='updated-date'>{note.updated_at.split('.')[0]}</p>
                                    </div>
                                    <div id="delete-note-modal-container">
                                        <OpenModalButton
                                            buttonText='🗑'
                                            modalComponent={<DeleteModal note={note} setDeleteNoteState={setDeleteNoteState} deleteNoteState={deleteNoteState} />}
                                        />
                                    </div>

                                </div>
                                {noteTest(note.id)}

                            </div>
                        ))
                    }
                </div>


            </div>

            <div className='new-note-area'>
                <form id='new-note-form' onSubmit={handleSubmit} method={Object.values(clickedNote).length ? "PUT" : "POST"}>

                    {/* <textarea
                        id='title-textarea'
                        value={title.trimStart()}
                        rows="2"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    >
                    </textarea> */}
                    <input
                        id='title-textarea'
                        value={title.trimStart()}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'

                    >
                    </input>
                    <textarea
                        id='note-content-textarea'
                        value={noteContent.trimStart()}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder='Start writing'
                        rows='50'
                    >
                    </textarea>
                    <div id="saved">
                        <button type='submit' id='save-note-btn'>Save Note</button>
                        {showSaved && <p>Saved!</p>}
                    </div>
                    {notetags && (Object.values(clickedNote).length > 0) ? AddTagForm(clickedNote.id) : ''}

                    {AddToNotebookForm()}

                    {/* {notetags && notetags ? AddTagForm(clickedNote.id) : ''} */}
                    {errors.title && <p className='note-errors'>{errors.title}</p>}
                    {errors.noteContent && <p className='note-errors'>{errors.noteContent}</p>}
                    {errors.note && <p className='note-errors'>{errors.note}</p>}

                </form>
                {/* FOR IF I WANT TRASH STORAGE INSTEAD OF IMMEDIATE DELETION LATER*/}
                {/* <button onClick={(e) => setTrash(!trash)}>trash</button> */}

            </div>


        </div>
    )

}

export default CurrentNotes
