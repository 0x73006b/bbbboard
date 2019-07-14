import React from 'react';
import TextInput from './TextInput';
import MessageDisplay from './MessageDisplay';
import { setupMsg } from '../actions';
import { connect } from 'react-redux';
import '../index.css';

const fetchInitialMessageArray = async () => {
  try {
    const retrievedMessages = await fetch('http://bbbboardapi.herokuapp.com/get');
    // console.log(retrievedMessages);
    return (await retrievedMessages.json());
  } catch (e) {
    console.error('=============\n ERROR @ fetchInitialMessageArray in App.js\n=============');
  }
};

class App extends React.Component {
  constructor () {
    super();
    this.state = { data: [] };
  }
  async componentDidMount () {
    let msgArray = await fetchInitialMessageArray();
    // console.log(msgArray);
    this.props.setupMsg(msgArray);
  }

  render () {
    return (
      <div>
        <div className='header'>bbbboard5</div>
        <div className='navBar'> <a href='index.html'>home.</a> <a href='about.html'>about.</a> </div>
        <TextInput />
        <MessageDisplay />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    messageArray: state.messageArray
  };
};

export default connect(mapState, { setupMsg })(App);
