import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import './index.css'

import NewNotebook from '../NewNotebook/index'
import { getNotebooksThunk } from "../../../store/notebook"
import { getNotesThunk } from "../../../store/notes"
import NotebookItems from "./notebookItems"


const CurrentNotebooks = () => {

    const dispatch = useDispatch()

    const notebookObj = useSelector(state => state.notebooks.allNotebooks)
    const notebooks = Object.values(notebookObj)

    const notesObj = useSelector(state => state.notes.allNotes)
    const notes = Object.values(notesObj)

    const userObj = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])

    if (!notebookObj && !notesObj) return null
    return (
        <div className="everything-wrapper">
            <div className="notebook-wrapper">
                <h1>NOTEBOOKS</h1>
                <div className="new-notebook-component">
                    <NewNotebook />
                </div>
                <div className={`notebook-div-container`}>
                    <p>TITLE</p>
                    <p>CREATED BY</p>
                    <p>UPDATED</p>
                    <p>SHARED WITH</p>
                    <p>ACTIONS</p>
                </div>
                <div className="notebook-content-div">
                    {notebookObj && notebooks.map(notebook =>
                        <NotebookItems userObj={userObj} notebook={notebook} notes={notes} />

                    )}
                </div>
            </div >

        </div>
    )


}

export default CurrentNotebooks
