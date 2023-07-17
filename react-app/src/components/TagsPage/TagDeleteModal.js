import React, { useState } from "react";
// import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal, closeModal } from "../../context/Modal";

import { deleteTagThunk } from "../../store/tags";
// import { renderSwitch, setRenderSwitch } from "../TagsPage";




function TagDeleteModal({tagId, tagName, renderSwitch, setRenderSwitch}) {

  async function deleteTest(tagId) {
    return dispatch(deleteTagThunk(tagId))
    .then(() => {
        let temp = renderSwitch;
        setRenderSwitch(!temp);

        closeModal();
    })
    .catch(async (res) => {
    })

  }

  const dispatch = useDispatch();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   } else {
  //       closeModal()
  //   }
  // };

  // const handleDemoUser = async (e) => {
  //   await dispatch(login('demo@aa.io', 'password'))
  //   closeModal()
  //   return

  // }

  return (
    <>
      <h1>Delete tag?</h1>
      <div>Are you sure you want to delete the {tagName} tag? This tag will be removed from all notes.</div>

      <span className="tag-node-delete-button">
          {<button onClick={() => {deleteTest(tagId)}}>Delete</button>}

          {<button onClick={() => closeModal}>Cancel</button>}
      </span>
    </>
  );
}

export default TagDeleteModal;
