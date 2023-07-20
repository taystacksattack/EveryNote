import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentNotes from './components/NotesPage'
import CurrentNotebooks from "./components/Notebooks/NotebookPage";
import NotebookDetails from "./components/Notebooks/NotebookDetailPage"
import NewNotebook from "./components/Notebooks/NewNotebook"
import CurrentTasks from './components/TasksPage'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'
// import LandingPage from './components/LandingPage'
import './App.css'

import TagsPage from './components/TagsPage'
import LandingPage from "./components/LandingPage";


function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* {true ?  : null} */}

      <div className="app-100-wrapper">
      <div className="app-wrapper">
        <div className="app-navbar">
          <Navigation isLoaded={isLoaded} />
        </div>
        {isLoaded && (
          <Switch>

            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/notes">
              <CurrentNotes />
            </Route>
            <Route exact path="/notebooks/new">
              <NewNotebook />
            </Route>
            <Route exact path="/notebooks/:notebookId">
              < NotebookDetails />
            </Route>

            <Route path="/notebooks">
              <CurrentNotebooks />
            </Route>

            <Route path="/tags">
              <TagsPage />
            </Route>

            <Route path="/tasks/:taskId/edit/">
              <EditTask />
            </Route>
            <Route path="/tasks/new">
              <CreateTask />
            </Route>
            <Route path="/tasks">
              <CurrentTasks />
            </Route>
            <Route path="/" >
             {!sessionUser? <LandingPage /> : <CurrentNotes/>}
            </Route>
          </Switch>
        )}
        </div>
      </div>

    </>
  );
}

export default App;
