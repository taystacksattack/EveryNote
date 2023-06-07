import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react" //useState
import { getTagsThunk } from "../../store/tags"
import { getNoteTagsThunk } from "../../store/notetags"
import { getNotesThunk } from "../../store/notes"
import "./TagsPage.css"
// import { title } from "../NotesPage"


const TagsPage = () => {

    const dispatch = useDispatch();

    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);
    // const this_user = useSelector(state => state.session.user)
    const [ sortAlphaNum, setSortAlphaNum ] = useState(true); //true, sort by alphabetical
                                                            //false, sort by number of owned notes
    const taglist = Object.values(alltags);
    const sortedByNotesList = sortByOwnedNotes(taglist)
    const sortedByAlphaList = sortByAlphabetical(taglist)

    // useEffect(() => {
    //     test()
    // }, [])

    useEffect(() => {
        dispatch(getTagsThunk());
        dispatch(getNoteTagsThunk());
        dispatch(getNotesThunk());
    }, [dispatch])

    // const test = () => {
    //     const testTitle = title
    //     console.log("does this even work??", testTitle)
    // }

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
