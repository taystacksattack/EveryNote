import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTagsThunk } from "../../store/tags"
import { getNoteTagsThunk } from "../../store/notetags"
import "./TagsPage.css"

const TagsPage = () => {

    const dispatch = useDispatch();
    const alltags = useSelector(state => state.tags);
    const taglist = Object.values(alltags);

    useEffect(() => {
        dispatch(getTagsThunk());
        dispatch(getNoteTagsThunk());
    }, [dispatch])

    return (
        <div>
            <h1> Tags Page!</h1>
            <div>
                {taglist.map(
                tag => (
                    <>
                    <div>
                        tag_id: {tag.id}
                    </div>
                    <div>
                        tag_name: {tag.name}
                    </div>
                    <div>
                        num_notes: {tag.num_notes}
                    </div>
                    <br></br>
                    </>
                )
            )}</div>
        </div>
    )
}

export default TagsPage
