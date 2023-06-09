import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { addNoteTagThunk } from "../../store/notetags";
// import 'TagsPage.css';

function AddSelectNoteToTag(tagId) {
  const dispatch = useDispatch();
  const [noteIdChoice, setNoteIdChoice] = useState();

  try {

      const currentTag = alltags[noteId]
      const notesOfCurrentTag = notetags.tag_to_notes[tagId]

      const allNotesValues = Object.values(allnotes.allNotes);
      const allNotesList = allNotesValues.map((note) => {return {"id": note.id, "name": note.title} })

      const availableNotes = allNotesList.filter((val) => notesOfCurrentTag.indexOf(val.id) === -1)

      // allnotes.allNotes[noteId]

      console.log("\n\n\n\n(add SELECT) note CURRENT_tag??", currentTag)
      console.log("(ADD select) note, notes of tag??", notesOfCurrentTag)
      console.log("(addSelect) ALL notes VALUES???", allTagsValues)
      console.log("(addSelect) allnotes list???", allTagsList)
      console.log("(addSelect) unique, available notes??", availableNotes)


  const handleSubmitSelectNote = async (e) => {
    e.preventDefault();

    dispatch(addNoteTagThunk(noteIdChoice, tagId))
  };

  return (
    <>
      <div>Add Tag to Select Note</div>
      <form onSubmit={handleSubmitSelectNote}>
        <label>
          <select name="noteId"
          onChange={(e) => {
            setNoteIdChoice(e.target.value)}
        }>
            {/* MAP: option value=tagID, label tag_name */}
            <option value={""}>-Select Tag-</option>
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

export default AddSelectNoteToTag;
