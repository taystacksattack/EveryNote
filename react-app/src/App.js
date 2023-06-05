import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentNotes from './components/NotesPage'
import SingleNote from './components/SingleNotePage'

import "./app.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="app-100-wrapper">
      <div className="app-wrapper">
      <div className="app-navbar">
      <Navigation isLoaded={isLoaded}/>
      </div>

      <div className="app-contents">
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

            <SingleNote />

          </Route>
        </Switch>
      )}
      </div>
    {/* app wrapper end */}
    </div>
    </div>
    </>
  );
}

export default App;
