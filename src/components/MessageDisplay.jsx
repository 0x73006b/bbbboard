import React from 'react';
import { connect } from 'react-redux';
import { delMsg } from '../actions';
import axios from 'axios';

class MessageDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      setupHasRun: false,
      modalShow: [],
      messageArray: this.props.messageArray
    };
    this.delMsg = this.delMsg.bind(this);
    this.setup = this.setup.bind(this);
    this.detailModalSelector = this.detailModalSelector.bind(this);
    this.infoShowBooleanSetup = this.infoShowBooleanSetup.bind(this);
  }

  delMsg (messageItem, index) {
    console.log(index);
    axios.delete('http://bbbboardapi.herokuapp.com/delete', { params: { messageToDelete: messageItem } }).then(this.props.delMsg(index));
  }

  setup () {
    let setupHasRun = this.state.setupHasRun;
    if (setupHasRun) {
      return null;
    } else {
      this.setState({ setupHasRun: true });
      this.infoShowBooleanSetup();
    }
  }

  infoShowBooleanSetup () {
    let modalArray = [];
    for (let i = 0; i < this.props.messageArray.length; i++) {
      modalArray.push(false);
    }
    this.setState({ modalShow: modalArray });
  }

  detailModalSelector (index) {
    let modalShow = this.state.modalShow;
    modalShow[index] = !modalShow[index];
    this.setState({ modalShow: modalShow });
  }

  render () {
    this.setup();
    let messageArray = this.props.messageArray;
    const messagesToPost = messageArray.map((messageItem, index) =>
      <li key={index}>
        <button className='buttonsInfo' onClick={() => this.detailModalSelector(index)}>Info.</button>
        {' '}
        <button className='buttonsInfo' onClick={() => this.delMsg(messageItem, index)}>Delete.</button>
        {''} <strong>{messageItem.username}</strong>: {messageItem.message}
        {this.state.modalShow[index] ? <div> Index: {index} </div> : null}
      </li>);

    return (
      <div>
        <div className='messageContainer'>
          <ul>
            {messagesToPost}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    messageArray: state.messageArray
  };
};

export default connect(mapState, { delMsg })(MessageDisplay);
