import React from "react";


class Message extends React.Component {

  render(){
    return (
      <div className="message">
        <div className="message__user">{ this.props.data.user }</div>
        <div className="message__text">{ this.props.data.text }</div>
      </div>
    );
  }

}


export default Message;
