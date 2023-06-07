import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTagsThunk } from "../../store/tags"
import { getNoteTagsThunk } from "../../store/notetags"
import { getNotesThunk } from "../../store/notes"
import "./TagsPage.css"

const TagsPage = () => {

    const dispatch = useDispatch();

    const alltags = useSelector(state => state.tags);
    const allnotes = useSelector(state => state.notes);
    const notetags = useSelector(state => state.notetags);
    const this_user = useSelector(state => state.session.user)

    const taglist = Object.values(alltags);

    useEffect(() => {
        dispatch(getTagsThunk());
        dispatch(getNoteTagsThunk());
        dispatch(getNotesThunk());
    }, [dispatch])

    // const loaded = () => {
    //     return alltags && allnotes && notetags
    // }


    // console.log("\n\n\nallnotes???", allnotes.allNotes[1].title)
    const numNotesByOwner = (tagId) => {
        let count = 0;

        if (tagId && notetags.tag_to_notes[tagId]) {
            // console.log("\n\n\ncurrent tagId", tagId)
            const noteIdList = notetags.tag_to_notes[tagId]
            // console.log("\n\n\nCURRENT NOTEIDLIST", noteIdList)
            for (let noteId of noteIdList) {
                if (allnotes.allNotes[noteId]) {
                    count += 1;
                }
            }
        }


        // noteIdList.forEach((note) => {

        //     console.log("\n\n\nINSIDE", note)
        //     // try {
        //     //     if (note.ownerId == this_user.id) {
        //     //         count += 1;
        //     //     }
        //     // }
        //     // catch (e) {
        //     //     console.log("INNER ERROR", e)
        //     // }
        // })

        return count;
    }

    const listValidNotes = (noteId) => {
        try {
            return <li>{noteId}: {allnotes.allNotes[noteId].title}</li>
        } catch {

        }
    }

    const waitForLoad = (tagId) => {
        try {
            return (
             <>
            <ul>
                {notetags.tag_to_notes[tagId] && notetags.tag_to_notes[tagId].map(
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
            console.log("\n\n\nERROR", e)
        }
    }

    return (
        <div>
            <h1> Tags Page!</h1>
            <div>
                {taglist && taglist.map(
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
