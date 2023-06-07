import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { createTagThunk } from "../../store/tags";

function TagCreateModal(createOrRename) {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTag = { name: tagName };
    console.log("actual newtag create, name ", tagName )

    dispatch(createTagThunk(newTag));
    closeModal();
    }



  return (
    <>
      <h1>Create New Tag</h1>
      <form onSubmit={handleSubmit}>
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
              console.log("text??", e.target.value)
              setTagName(e.target.value)
              }
            }
              required
          />
        </label>
        <button type="submit">Create Tag</button>
      </form>
    </>
  );
}

export default TagCreateModal;
