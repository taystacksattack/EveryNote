import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import notesReducer from './notes';
import notebooksReducer from './notebook';
import tasksReducer from './tasks';
import tagsReducer from './tags';
import noteTagsReducer from './notetags';


const rootReducer = combineReducers({
  session,
  notes: notesReducer,
  notebooks: notebooksReducer,
  notetags: noteTagsReducer,
  tags: tagsReducer,
  tasks: tasksReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
