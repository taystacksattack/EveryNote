import { useEffect } from "react"
// import {useState } from "react"
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
                    <h1 className="notebook-num-stuff">{notebookNum(notebooks)}</h1>
                </div>
                <div className="new-notebook-component">
                    <NewNotebook />
                </div>
                <div className="notebook-div-container">
                    <p className="notebook-headings">TITLE</p>
                    <p className="notebook-headings">CREATED BY</p>
                    <p className="notebook-headings">UPDATED</p>
                    <p className="notebook-headings">ACTIONS</p>
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
