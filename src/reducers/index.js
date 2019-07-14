import { combineReducers } from 'redux';
import messageReducer from './messageReducer';

// // const postmessage = (state = initState, action) => {
const rootReducer = combineReducers({
  messageArray: messageReducer
});

export default rootReducer;
