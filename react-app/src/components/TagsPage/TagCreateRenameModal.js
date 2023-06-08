import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { createTagThunk, updateTagThunk } from "../../store/tags";

function TagCreateRenameModal({createOrRename, tag}) {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState(tag ? tag.name : "");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //let thisMethod = ""

    if (createOrRename == "Create New") {
      const newTag = { name: tagName };
      console.log("actual newtag create, name ", tagName )

      //thisMethod = "POST"

      dispatch(createTagThunk(newTag));
      closeModal();
    }

    else if (createOrRename == "Rename") {
      const updateTag = { name: tagName };

      //thisMethod = "UPDATE"

      dispatch(updateTagThunk(updateTag, tag.id));
      closeModal();
    }
    }



  return (
    <>
      <h1>{createOrRename} Tag</h1>
      <form onSubmit={handleSubmit} >
        {/* method={tag ? "PUT" : "POST"} */}
        {/* <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul> */}
        <label>
          Tag Name
          <input
            type="text"
            value={tagName}
            onChange={(e) => {
              // console.log("text??", e.target.value)
              setTagName(e.target.value)
              }
            }
              required
          />
        </label>
        <button type="submit">{createOrRename} Tag</button>
      </form>
    </>
  );
}

export default TagCreateRenameModal;
