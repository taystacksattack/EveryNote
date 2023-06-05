import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentNotes from './components/NotesPage'

import "./app.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="app-wrapper">app wrapper
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
          </Route>
        </Switch>
      )}
      </div>
    {/* app wrapper end */}
    </div>
    </>
  );
}

export default App;
