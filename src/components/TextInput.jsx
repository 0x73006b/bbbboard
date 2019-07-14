import React from 'react';
import { connect } from 'react-redux';
import { postMsg, editMsg } from '../actions';
import axios from 'axios';

function inputValidation (inputStr) {
  console.log(inputStr.charAt(0));
  console.log(inputStr.charAt(inputStr.length - 1));
  if ((inputStr.length === 1)) {
    return (inputStr.charAt(0) === ' ') ? 1 : 0;
  } else {
    return ((inputStr.charAt(0) === ' ') || (inputStr.charAt(inputStr.length - 1) === ' ')) ? 1 : 0;
  }
}

export class TextInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nameInput: '',
      messageInput: '',
      _id: ''
    };
    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleId = this.handleId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  handleName (event) { this.setState({ nameInput: event.target.value }); }
  handleMessage (event) { this.setState({ messageInput: event.target.value }); }
  handleId (event) { this.setState({ _id: event.target.value }); }

  clearInputs () {
    this.setState({
      nameInput: '',
      messageInput: '',
      _id: ''
    });
  }

  handleEdit () {
    if (inputValidation(this.state.nameInput) && inputValidation(this.state.messageInput)) {
      this.clearInputs();
      alert('Neither name nor Message can start or end with a blank space.');
      return;
    } else if (inputValidation(this.state.nameInput)) {
      this.clearInputs();
      alert('Name cannot start or end with a blank space.');
      return;
    } else if (inputValidation(this.state.messageInput)) {
      this.clearInputs();
      alert('Message cannot start or end with a blank space.');
      return;
    }

    let messageObject = {
      username: this.state.nameInput,
      message: this.state.messageInput,
      _id: this.state._id
    };

    this.clearInputs();
    axios.put('http://bbbboardapi.herokuapp.com/put', messageObject)
      .then(this.clearInputs())
      .then(this.props.editMsg(messageObject))
      .catch(err => console.log(err));
  }

  handleSubmit (event) {
    event.preventDefault();

    if (inputValidation(this.state.nameInput) && inputValidation(this.state.messageInput)) {
      this.clearInputs();
      alert('Neither name nor Message can start or end with a blank space.');
      return;
    } else if (inputValidation(this.state.nameInput)) {
      this.clearInputs();
      alert('Name cannot start or end with a blank space.');
      return;
    } else if (inputValidation(this.state.messageInput)) {
      this.clearInputs();
      alert('Message cannot start or end with a blank space.');
      return;
    }

    let messageObject = {
      username: this.state.nameInput,
      message: this.state.messageInput,
      _id: this.state._id
    };

    this.clearInputs();
    axios.post('http://bbbboardapi.herokuapp.com/post', messageObject)
      .then(this.clearInputs())
      .then(this.props.postMsg(messageObject))
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div>
        <form className='textInputArea' onSubmit={this.handleSubmit}>
          <h2>Name.</h2>
          <textarea name='user_nameInput' required value={this.state.nameInput} onChange={this.handleName} /> <p />
          <h2>Message.</h2>
          <textarea name='user_messageInput' required value={this.state.messageInput} onChange={this.handleMessage} /> <p />
          <h2>Unique ID.</h2>
          <input placeholder='Put a number combination here.' type='text' pattern='[0-99999]*' name='user_messageInput' value={this.state._id} onChange={this.handleId} /> <p />
          <span className='buttonSpan'>
            <button className='buttons' type='submit'>post</button> <p />
            <button className='buttons' type='button' onClick={() => this.handleEdit()}>edit</button> <p />
          </span>
        </form>
      </div>
    );
  }
}

export default connect(null, { postMsg, editMsg })(TextInput);
