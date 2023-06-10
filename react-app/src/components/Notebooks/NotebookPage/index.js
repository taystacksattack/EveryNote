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

    const notebookNum = () => {
        if (notebooks.length === 0) return "Time to create a new notebook"
        if (notebooks.length > 0 && notebooks.length < 2) return "Notebook (1)"
        return `Notebooks (${notebooks.length})`
    }

    useEffect(() => {
        dispatch(getNotebooksThunk())
        dispatch(getNotesThunk())
    }, [dispatch])

    if (!notebookObj && !notesObj) return null
    return (
        <div className="everything-wrapper-2">
            <div className="notebook-wrapper">
                <div className="add-note-notebook">
                    <h1>{notebookNum(notebooks)}</h1>
                </div>
                <div className="new-notebook-component">
                    <NewNotebook />
                </div>
                <div className={`notebook-div-container`}>
                    <p className="notebook-title">TITLE</p>
                    <p>CREATED BY</p>
                    <p>UPDATED</p>
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
