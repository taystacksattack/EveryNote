import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentNotes from './components/NotesPage'
import CurrentNotebooks from "./components/NotebookPage";
import CurrentTasks from './components/TasksPage'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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

          <Route path="/notebooks">
            <CurrentNotebooks />
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
        </Switch>
      )}
    </>
  );
}

export default App;
