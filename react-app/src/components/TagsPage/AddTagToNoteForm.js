
import React, { useState } from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { addNoteTagThunk } from "../../store/notetags";
// import 'TagsPage.css';

function AddTagForm({noteId}) {
  const dispatch = useDispatch();
//   const [noteIdChoice, setNoteIdChoice] = useState("");
  const [tagIdChoice, setTagIdChoice] = useState();

  const alltags = useSelector(state => state.tags);
  const allnotes = useSelector(state => state.notes);
  const notetags = useSelector(state => state.notetags);

  // useEffect(() => {
  //   console.log("current tagID Choice!", tagIdChoice)
  // })

  try {

      const currentNote = allnotes.allNotes[noteId]
      const tagsOfCurrentNote = notetags.note_to_tags[noteId]

      const allTagsValues = Object.values(alltags);
      const allTagsList = allTagsValues.map((tag) => {return {"id": tag.id, "name": tag.name} })

      const availableTags = allTagsList.filter((val) => tagsOfCurrentNote.indexOf(val.id) === -1)



      // console.log("\n\n\n\nADDTAGNOTEFORM CURRENTNOTE??", currentNote)
      // console.log("ADDTAGNOTEFORM TAGS OF CURRENTNOTE??", tagsOfCurrentNote)
      // console.log("ALLTAGS VALUES???", allTagsValues)
      // console.log("ALLTAGS LIST???", allTagsList)
      // console.log("UNIQUE TAGS??", availableTags)


  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addNoteTagThunk(noteId, tagIdChoice))
  };

  return (
    <>
      <div>Add Tag to Current Note</div>
      <form onSubmit={handleSubmit}>
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
          <select name="tagId"
          onChange={(e) => {
            setTagIdChoice(e.target.value)}
        }>
            {/* MAP: option value=tagID, label tag_name */}
            <option value={""}>-Select Tag-</option>
            {availableTags.map((tagNamePair) => (
                 <option value={tagNamePair.id}>{tagNamePair.name}</option>
            ))}

          </select>

        </label>
        <button>Add Tag (Refresh after Add)</button>
        {/* <button type="submit">Add Tag (Refresh after Add)</button> */}
      </form>
    </>
  );

} catch {
    return (<></>)
}
}

export default AddTagForm;
