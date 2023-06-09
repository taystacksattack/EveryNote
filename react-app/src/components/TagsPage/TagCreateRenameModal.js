import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { createTagThunk, updateTagThunk } from "../../store/tags";

import "./TagCreateRenameModal.css"

function TagCreateRenameModal({createOrRename, tag}) {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState(tag ? tag.name : "");
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const submitErrors = {};

    if (tagName.length === 0 || tagName.length > 30) {
      submitErrors.tagName = "Name length must be between 1 and 30 characters"
      setErrors(submitErrors)
      return;
    }

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

  // const errorOrBlank = () => {
  //   errors.tagName ? errors.tagName : "<br></br>";
  // }

  return (
    <>
      <div className="create-rename-wrapper">
      <h1 className="create-rename-title">{createOrRename} Tag</h1>
      <form onSubmit={handleSubmit} >
        {/* method={tag ? "PUT" : "POST"} */}
        {/* <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul> */}
        <p id="create-rename-errors">
          {errors.tagName ? errors.tagName : ""}
          {/* {errorOrBlank} */}
        </p>

        <label id="create-rename-label">
          Tag Name

          <input
            id="create-rename-input"
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

      </div>
    </>
  );
}

export default TagCreateRenameModal;
