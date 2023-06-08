import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react" //useState
import { createTagThunk, deleteTagThunk, getTagsThunk } from "../../store/tags"
import { getNoteTagsThunk, addNoteTagThunk } from "../../store/notetags"
import { getNotesThunk } from "../../store/notes"
import "./TagsPage.css"
// import { title } from "../NotesPage"

import OpenModalButton from "../OpenModalButton";
import TagDeleteModal from "./TagDeleteModal"
import TagCreateRenameModal from "./TagCreateRenameModal"
//import DeleteGroupModal from "../DeleteGroupModal";
import CurrentNotes from "../NotesPage"


const TagsPage = () => {

    const dispatch = useDispatch();

    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);
    // const this_user = useSelector(state => state.session.user)
    const [ sortAlphaNum, setSortAlphaNum ] = useState(true); //true, sort by alphabetical
    //false, sort by number of owned notes
    const [renderSwitch, setRenderSwitch] = useState(true);



    const taglist = Object.values(alltags);
    //
    //
    // HERE FOR REFERENCE
    //COPIES OF TAG LIST, SORTED BY MOST NOTES
    const sortedByNotesList = sortByOwnedNotes(taglist)
    //SORTED BY ALPHABETICAL
    const sortedByAlphaList = sortByAlphabetical(taglist)
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
        console.log("test noteTag with note 1, tag 3");

        return dispatch(addNoteTagThunk(noteId, tagId))
        .then(() => {
            let temp = renderSwitch;
            setRenderSwitch(!temp);
        })
        .catch(async (res) => {
            console.log("addNoteTag errors?", res)
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
    function noteTest(noteId) {
        try {
            const currentNote = allnotes.allNotes[noteId]
            const currentNoteTags = notetags.note_to_tags[noteId]

            console.log("\n\n\nNOTE TEST CURRENT NOTE, ", currentNote)
            console.log("CURRENT NOTE TAGS", currentNoteTags)

            return (
                <>
                <div>
                    NOTE TEST, with NOTE 1
                </div>
                <div>id: {currentNote.id}</div>
                <div>title: {currentNote.title}</div>
                <div>preview: {currentNote.body.slice(0, 25)}...</div>
                <br></br>
                <div>TAGS:</div>
                {currentNoteTags.map((tagId) => {
                    return (
                        <>
                        <a href="/tags">
                        <span>{tagId}: {alltags[tagId].name}</span>
                        </a>
                        <button onClick={()=> removeTagFromNote()}>(remove this tag)</button>

                        </>
                        )
                })}
                </>
            )
        } catch {}

    }

    async function removeTagFromNote(noteId, tagId) {

        console.log("remove tag from note")
    }
    //END OF NOTE TEST
    //
    //

    async function createTest() {
        const newTag = { name: "test tag"};

        console.log("creating new tag...");
        return dispatch(createTagThunk(newTag))

        .catch(async (res) => {
            // const data = await res.json();
            // if (data && data.errors) {
            //     return data.errors
            // }
            console.log("errors?")
        })
    }

    async function deleteTest(tagId) {
        console.log("testing delete...");

        return dispatch(deleteTagThunk(tagId))
        .then(() => {
            let temp = renderSwitch;
            setRenderSwitch(!temp);
        })
        // .then(dispatch(getTagsThunk()))
        .catch(async (res) => {
            console.log("delete error?")
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
        catch {}
        return count;
    }

    const listValidNotes = (noteId) => {
        try {
            return (<a href="/notes/"><li>{noteId}: {allnotes.allNotes[noteId].title}</li></a>)
        } catch {
// ///////////////////////////////////////////////////
//ADD SPECIFIC NOTE_ID LOGIC TO <A> LINKS
        }
    }

    const waitForLoad = (tagId) => {
        try {
            return (
             <>
            <ul>
                {notetags.tag_to_notes[tagId].map(
                        note_id => (
                            <>
                                {listValidNotes(note_id)}
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
        <div>
            <h1> Tags Page!</h1>


            {/* Adding note example here */}
            <div>
                {noteTest(1)}
            </div>
            {/* End of note example */}



            <br></br>
            <div>
                <OpenModalButton
                    buttonText="Create New Tag"
                    modalComponent={<TagCreateRenameModal createOrRename="Create New" />}
                />
            </div>

            <button onClick={createTest}>Test, Create New Tag</button>
            <button onClick={() => {addNoteTag(1, 2)}}>Test NoteTag, 1/3</button>
            <button onClick={toggleSort}>Toggle Sort: alphabetical or notes</button>
            <div>
                {alphaOrNum().map(
                // {sortedByAlphaList && sortedByAlphaList.map(
                // {sortedByNotesList && sortedByNotesList.map(
                // {taglist && taglist.map(
                tag => (
                    <>
                    <div key={tag.id}>
                        tag_id: {tag.id}
                    </div>
                    <div key={tag.name}>
                        tag_name: {tag.name}
                    </div>
                    {/* <div>
                        num_notes: {tag.num_notes}
                    </div> */}
                    <div>
                        num_notes: {tag.id && numNotesByOwner(tag.id)}
                    </div>

                    <div>
                    <OpenModalButton
                        buttonText="Rename Tag"
                        modalComponent={<TagCreateRenameModal createOrRename="Rename" tag={tag} />}
                    />
                    </div>

                    {<button onClick={() => {deleteTest(tag.id)}}>Test Delete this Tag</button>}
                        {waitForLoad(tag.id)}
                    <br></br>
                    </>
                )
            )}
            </div>
        </div>
    )
}

export default TagsPage
