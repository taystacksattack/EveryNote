
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react" //useState
import { deleteTagThunk, getTagsThunk } from "../../store/tags"
// import { createTagThunk } from "../../store/tags"
import { getNoteTagsThunk, addNoteTagThunk, deleteNoteTagThunk, removeAllNoteTagThunk } from "../../store/notetags"
import { getNotesThunk } from "../../store/notes"
import "./TagsPage.css"
// import { title } from "../NotesPage"

// import OpenModalButton from "../OpenModalButton";

import OpenModalCustomIcon from "../OpenModalButton/OpenModalCustomIcon"
import TagDeleteModal from "./TagDeleteModal"
import TagCreateRenameModal from "./TagCreateRenameModal"
//import DeleteGroupModal from "../DeleteGroupModal";
// import CurrentNotes from "../NotesPage"

// import AddTagForm from "./AddTagToNoteForm"

const TagsPage = () => {

    const dispatch = useDispatch();

    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);
    // const this_user = useSelector(state => state.session.user)
    const [sortAlphaNum, setSortAlphaNum] = useState(true); //true, sort by alphabetical
    //false, sort by number of owned notes
    const [renderSwitch, setRenderSwitch] = useState(true);
    const [noteIdChoice, setNoteIdChoice] = useState();



    const taglist = Object.values(alltags);
    //
    //
    // HERE FOR REFERENCE
    //COPIES OF TAG LIST, SORTED BY MOST NOTES
    const sortedByNotesList = sortByOwnedNotes(taglist)
    //SORTED BY ALPHABETICAL
    const sortedByAlphaList = sortByAlphabetical(taglist)

    // sortedByNotesList && console.log("sortedByNotesLIst", sortedByNotesList)
    // sortedByAlphaList && console.log("sortedByAlphaLIst", sortedByAlphaList)
    //
    //
    //
    // useEffect(() => {
    //     testFunction()
    // }, [])

    // function testFunction() {
    //     console.log("\n\n\nON LOAD")
    //     const firstNote = allnotes.allNotes["1"]
    //     CurrentNotes.handleNoteClick(firstNote)

    // }



    useEffect(() => {
        dispatch(getTagsThunk());
        dispatch(getNoteTagsThunk());
        dispatch(getNotesThunk());
    }, [dispatch, renderSwitch])

    async function addNoteTag(noteId, tagId) {
        // console.log("test noteTag with note 1, tag 3");

        return dispatch(addNoteTagThunk(noteId, tagId))
            .then(() => {
                let temp = renderSwitch;
                setRenderSwitch(!temp);
            })
            .catch(async (res) => {
                // console.log("addNoteTag errors?", res)
            })
    }

    /////TEST NOTE DISPLAY
    // function giveTagObj(tagId) {
    //     try {
    //         console.log("giveTagObj ALLTAGS?", alltags.tags)

    //         const resTag = alltags[tagId]
    //         return resTag.name;
    //     } catch (e) {
    //         console.log("getTagObj failed: ", e)
    //     }
    // }

    //NOTE TESTTTT
    //

    ///Create Add tag to select note
    function AddSelectNoteToTag(tagId) {
        // const dispatch = useDispatch();
        // const [noteIdChoice, setNoteIdChoice] = useState();

        try {

            const currentTag = alltags[tagId]

            const notesOfCurrentTag = notetags.tag_to_notes[tagId] ? notetags.tag_to_notes[tagId] : []

            const allNotesValues = Object.values(allnotes.allNotes);
            const allNotesList = allNotesValues.map((note) => { return { "id": note.id, "title": note.title } })


            const availableNotes = allNotesList.filter((val) => notesOfCurrentTag.indexOf(val.id) === -1)

            // allnotes.allNotes[noteId]

            // console.log("\n\n\n\n(add SELECT) note CURRENT_tag??", currentTag)
            // console.log("(ADD select) note, notes of tag??", notesOfCurrentTag)
            // console.log("(addSelect) ALL notes VALUES???", allNotesValues)
            // console.log("(addSelect) allnotes list???", allNotesList)
            // console.log("(addSelect) unique, available notes??", availableNotes)


            const handleSubmitSelectNote = async (e) => {
                e.preventDefault();
                dispatch(addNoteTagThunk(noteIdChoice, tagId));
                setRenderSwitch(!renderSwitch);
            };

            return (
                <>
                    <div>Add This Tag to Select Note</div>
                    <form onSubmit={handleSubmitSelectNote}>
                        <label>
                            <select name="noteId"
                                onChange={(e) => {
                                    setNoteIdChoice(e.target.value)
                                }} className="tag-select-note-tag-selections">

                                {/* MAP: option value=tagID, label tag_name */}
                                <option value={""}>-Select Note-</option>

                                {availableNotes.map((noteNamePair) => (
                                    <option value={noteNamePair.id}>{noteNamePair.title}</option>
                                ))}

                            </select>

                        </label>
                        <button>Add Tag</button>
                        {/* <button type="submit">Add Tag (Refresh after Add)</button> */}
                    </form>
                </>
            );

        } catch {
            return (<></>)
        }
    }
    ////////////END add tag to select note


    // function noteTest(noteId) {
    //     try {
    //         const currentNote = allnotes.allNotes[noteId]
    //         const currentNoteTags = notetags.note_to_tags[noteId]

    //         console.log("\n\n\nNOTE TEST CURRENT NOTE, ", currentNote)
    //         console.log("CURRENT NOTE TAGS", currentNoteTags)

    //         return (
    //             <>
    //             <div>
    //                 NOTE TEST, with NOTE {noteId}
    //             </div>
    //             <div>id: {currentNote.id}</div>
    //             <div>title: {currentNote.title}</div>
    //             <div>preview: {currentNote.body.slice(0, 25)}...</div>
    //             <br></br>
    //             <div>TAGS:</div>
    //             {currentNoteTags && currentNoteTags.map((tagId) => {
    //                 return (
    //                     <>
    //                     {/* <a href="/tags">
    //                     <span>{tagId}: {alltags[tagId].name}</span>
    //                     </a>
    //                     <button onClick={()=> removeTagFromNote(currentNote.id, tagId)}>(remove this tag)</button> */}
    //                     <div className="tag-button">
    //                         <a href="/tags">
    //                             <span id='tag-names'>{`${alltags[tagId].name} `}</span>
    //                         </a>
    //                         <span onClick={()=> removeTagFromNote(currentNote.id, tagId)}><i className="fa-solid fa-circle-xmark"></i></span>
    //                     </div>
    //                     </>
    //                     )
    //             })}
    //             </>
    //         )
    //     } catch {}

    // }

    async function removeTagFromNote(noteId, tagId) {

        // console.log("remove tag from note")
        return dispatch(deleteNoteTagThunk(noteId, tagId))
            .then(() => setRenderSwitch(!renderSwitch))
            .catch(async (res) => {
                console.log("errors?", res)
            })
    }

    async function removeTagFromAll(tagId) {
        // console.log(`FIX LATER: remove tag ${tagId} from ALL notes`)
        return dispatch(removeAllNoteTagThunk(tagId))
            .then(() => setRenderSwitch(!renderSwitch))
            .catch(async (res) => {
                // console.log("errors?", res)
            })
    }
    //END OF NOTE TEST
    //
    //

    // async function createTest() {
    //     const newTag = { name: "test tag"};

    //     console.log("creating new tag...");
    //     return dispatch(createTagThunk(newTag))

    //     .catch(async (res) => {
    //         // const data = await res.json();
    //         // if (data && data.errors) {
    //         //     return data.errors
    //         // }
    //         console.log("errors?")
    //     })
    // }

    async function deleteTest(tagId) {
        // console.log("testing delete...");

        return dispatch(deleteTagThunk(tagId))
            .then(() => {
                let temp = renderSwitch;
                setRenderSwitch(!temp);
            })
            // .then(dispatch(getTagsThunk()))
            .catch(async (res) => {
                // console.log("delete error?")
            })



    }

    function alphaOrNum() {
        if (sortAlphaNum == true) {
            return sortedByAlphaList;
        } else if (sortAlphaNum == false) {
            return sortedByNotesList;
        }
    }
    //*                 {sortedByAlphaList && sortedByAlphaList.map(
    // {sortedByNotesList && sortedByNotesList.map( */
    function toggleSort() {

        // console.log("togglesort running?");

        const tempSort = sortAlphaNum;
        setSortAlphaNum(!tempSort);
    }


    function sortByOwnedNotes(tags) {
        const temp = [...tags];
        temp.sort((a, b) => {
            // console.log("\n\n\nWE SORTIN, A", a)
            // console.log("NUMNOTES A.ID", numNotesByOwner(a.id))
            // console.log("\n\n\nWE SORTIN, B", b)
            // console.log("NUMNOTES B.ID", numNotesByOwner(b.id))
            return numNotesByOwner(b.id) - numNotesByOwner(a.id)
        })
        return temp
    }

    function sortByAlphabetical(tags) {
        const temp = [...tags];

        temp.sort((a, b) => {
            // console.log("\n\n\nWE SORTIN, A", a)
            // console.log("NUMNOTES A.NAME", numNotesByOwner(a.name))
            // console.log("\n\n\nWE SORTIN, B", b)
            // console.log("NUMNOTES B.NAME", numNotesByOwner(b.name))
            // return a.name - b.name
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
            }
            else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            } else {
                return 0;
            }
        })
        return temp

    }

    function numNotesByOwner(tagId) {
        let count = 0;

        try {
            if (tagId && notetags.tag_to_notes[tagId]) {
                // console.log("\n\n\ncurrent tagId", tagId)
                const noteIdList = notetags.tag_to_notes[tagId]     //get list of ALL notes connected to tag
                // console.log("\n\n\nCURRENT NOTEIDLIST", noteIdList)
                for (let noteId of noteIdList) {
                    if (allnotes.allNotes[noteId]) { //if note seen in notetags also seen in notes
                        count += 1;                 //then user is owner, add 1 to count
                    }
                }
            }
        }
        catch { }
        return count;
    }

    const listValidNotes = (noteId, tagId) => {
        try {
            return (
                <>

                    <span className="tag-note-list-note-and-remove">
                        <a href="/notes/">
                            <li className="tag-note-list-note-li">{allnotes.allNotes[noteId].title}</li>
                        </a>
                        {/* <span id="tag-note-list-invisible-tab">_____</span> */}
                        {/* <button className="tag-note-list-remove-button" onClick={() => removeTagFromNote(noteId, tagId)}>Remove Tag</button> */}

                        <span className="material-symbols-outlined tag-remove-icon" title="Remove tag" onClick={() => removeTagFromNote(noteId, tagId)}>label_off</span>

                    </span>
                </>
            )
        } catch {
            // ///////////////////////////////////////////////////
            //ADD SPECIFIC NOTE_ID LOGIC TO <A> LINKS
        }
    }

    const waitForLoad = (tagId) => {
        try {
            return (
                <>
                    <ul className="tag-note-list-ul">
                        {notetags.tag_to_notes[tagId].map(
                            note_id => (
                                <>
                                    {listValidNotes(note_id, tagId)}
                                </>
                            )
                        )}
                    </ul>
                </>
            )
        } catch (e) {
            // console.log("\n\n\nERROR", e)
        }
    }

    return (
        <div className="tag-page-wrapper">

            <div className="tag-page-center">
            <div className='center-within'>
                    <div className="tag-list-top">

                        <span className="tag-title-and-new">
                            <h1>
                                <span className="material-symbols-outlined">sell</span>
                                &nbsp;
                                Tags</h1>


                            <span className="tag-list-hover-pointer">
                                <OpenModalCustomIcon
                                    modalComponent={<TagCreateRenameModal createOrRename="Create New" />}
                                    materialSymbolIconName="library_add"
                                    iconTitle="Create New Tag"
                                />
                            </span>
                        </span>
                        {/* <br></br> */}
                        {/*
            <p>Apply tags to better organize your notes!</p>
            <br></br>
        <p id="tag-list-top-sentence">(The following <span id='tag-list-top-sentence-tags'>tags</span> are applied to the following <span id="tag-list-top-sentence-notes">notes</span>)</p> */}
                        {/* <div className="tag-notetest-node">
                {noteTest(1)}
                </div>
                <div className="tag-notetest-note-controls">
                
                <AddTagForm noteId="1" />
                {/* <button onClick={createTest}>Test, Create New Tag</button>
                
                <button onClick={() => {addNoteTag(1, 2)}}>Test: Add to Note1, Tag2</button>
                
            </div> */}

                        <div className="tag-top-number-and-sort">
                            <span>
                                {taglist ? taglist.length + " tags" : "0 tags"}
                            </span>


                            <span
                                className="material-symbols-outlined tag-list-hover-pointer"
                                title="Sort: A-Z or #Notes"
                                onClick={toggleSort}>
                                sort
                            </span>
                        </div>


                        {/* <span className="tag-list-top-create-and-sort-buttons">

            </span> */}



                        {/* <span id="tag-list-top-create-button">
                <OpenModalButton
                buttonText="Create New Tag"
                modalComponent={<TagCreateRenameModal createOrRename="Create New" />}
                />
            </span> */}
                        {/*
                <span className="material-symbols-outlined tag-list-top-create-icon" title="Create New Tag">library_add</span> */}


                        {/* 07-17
                OpenModalCustomIcon,
                modalComponent,
                materialSymbolIconName
                iconTitle/hovertext
                onButtonClick
            */}

                        {/*
                <span id="tag-list-top-sort-button">
                <button onClick={toggleSort}>Toggle Sort: A-Z or #notes</button>
            </span> */}


                    </div>
                    {/* end of tag-list-top */}


                        {/* <div className='center-within'> */}
                    <div>
                        {alphaOrNum().map(
                            // {sortedByAlphaList && sortedByAlphaList.map(
                                // {sortedByNotesList && sortedByNotesList.map(
                                    // {taglist && taglist.map(
                                        tag => (
                                            <>
                                    <div className="tag-node">

                                        {/* <div key={tag.id}>
                        tag_id: {tag.id}
                        </div>
                        <div key={tag.name}>
                        tag_name: {tag.name}
                        </div>
                        //////// <div>
                        num_notes: {tag.num_notes}
                        </div>
                        <div>
                        num_notes: {tag.id && numNotesByOwner(tag.id)}
                    </div> */}

                                        <div className="tag-node-name-and-num">
                                            <span className="tag-node-name-and-num-span"> {/* added 07-18 */}
                                                <span className="tag-node-name-and-num-name">
                                                    {tag.name}
                                                </span>
                                                <span> </span>

                                                <span className="tag-node-name-and-num-num">
                                                    ({tag.id && numNotesByOwner(tag.id)})
                                                </span>
                                            </span>

                                            {/* add 07/17 */}
                                            <span className="tag-list-rename-delete">

                                                <span className="tag-list-hover-pointer">
                                                    <OpenModalCustomIcon
                                                        modalComponent={<TagCreateRenameModal createOrRename="Rename" tag={tag} />}
                                                        materialSymbolIconName="edit_square"
                                                        iconTitle="Rename Tag"
                                                    />
                                                </span>

                                                <span className="tag-list-hover-pointer">
                                                    <OpenModalCustomIcon
                                                        modalComponent={<TagDeleteModal
                                                            tagId={tag.id}
                                                            tagName={tag.name}
                                                            renderSwitch={renderSwitch}
                                                            setRenderSwitch={setRenderSwitch} />}
                                                        materialSymbolIconName="delete"
                                                        iconTitle="Delete Tag"
                                                    />
                                                </span>

                                            </span> {/* end of two buttons */}
                                        </div>
                                        <div>
                                            {waitForLoad(tag.id)}
                                        </div>

                                        <div className="tag-node-main-buttons">


                                            {/* <span className="tag-node-rename-button">
                    <OpenModalButton
                        buttonText="Rename Tag"
                        modalComponent={<TagCreateRenameModal createOrRename="Rename" tag={tag} />}
                    />
                    </span> */}



                                            {/* <span className="tag-node-rename-button">
                    <OpenModalCustomIcon
                        // buttonText="Rename Tag"
                        materialSymbolIconName={"none"}
                        modalComponent={<TagCreateRenameModal createOrRename="Rename" tag={tag} />}
                    />
                    </span> */}



                                            {/* <span className="tag-node-delete-button">
                    {<button onClick={() => {deleteTest(tag.id)}}>Delete this Tag</button>}
                    </span> */}




                                            {/* <span>
                        <button onClick={() => {removeTagFromAll(tag.id)}}>Remove Tag from ALL notes</button>
                    </span> */}
                                        </div>

                                        <div className="tag-select-note">
                                            {AddSelectNoteToTag(tag.id)}
                                        </div>




                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagsPage;
// export
