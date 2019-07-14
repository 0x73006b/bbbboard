import { POST_MSG, EDIT_MSG, DEL_MSG, SETUP_MSG } from '../actions';

const messageReducer = (state = [], action) => {
  let newState = state.slice(0);
  let newMessage;
  let messageExists;
  switch (action.type) {
    case SETUP_MSG:
      return (!action.msg) ? state : action.msg;

    case EDIT_MSG:
      newMessage = { username: action.msg.username, message: action.msg.message, _id: action.msg._id };
      messageExists = newState.find(function (messageObject) { return messageObject._id === newMessage._id; });
      console.log(messageExists);
      if (messageExists) {
        console.log('MESSAGE EXISTS, IN TRUE BLOCK');
        let messageIndex = newState.findIndex(function (messageObject) { return messageObject._id === newMessage._id; });
        console.log(messageIndex);
        newState[messageIndex] = newMessage;
      } else return newState;
      return newState;

    case POST_MSG:
      newMessage = { username: action.msg.username, message: action.msg.message, _id: action.msg._id };
      messageExists = newState.find(function (messageObject) { return messageObject._id === newMessage._id; });
      console.log(messageExists);
      if (messageExists) {
        console.log('MESSAGE EXISTS, IN TRUE BLOCK');
        return newState;
      } else {
        newState.push(newMessage);
      }
      return newState;

    case DEL_MSG:
      console.log(action);
      newState.splice(action.msg, 1);
      return newState;

    default:
      return state;
  }
};

export default messageReducer;
