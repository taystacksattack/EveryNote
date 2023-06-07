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

    const taglist = Object.values(alltags);

    useEffect(() => {
        dispatch(getTagsThunk());
        dispatch(getNoteTagsThunk());
        dispatch(getNotesThunk());
    }, [dispatch])


    // console.log("\n\n\nallnotes???", allnotes.allNotes[1].title)

    const waitForLoad = (tagId) => {
        try {
            return (
             <>
            <ul>
                {notetags.tag_to_notes[tagId] && notetags.tag_to_notes[tagId].map(
                        note_id => (
                            <>
                            <li>
                                {note_id}:
                                {allnotes.allNotes[note_id].title}
                            </li>
                            </>
                        )
                )}
            </ul>
            </>
            )
        } catch {}
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
                    <div>
                        num_notes: {tag.num_notes}
                    </div>
                        {tag.id && waitForLoad(tag.id)}
                    <br></br>
                    </>
                )
            )}
            </div>
        </div>
    )
}

export default TagsPage
