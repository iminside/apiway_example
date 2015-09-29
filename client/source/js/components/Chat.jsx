import React                    from "react";
import Message                  from "./Message.jsx";
import { Api, Resource, Store } from "apiway";


let errorsMsg = {
  "Text blank":  "Сообщение не может быть пустым",
  "Text length": "Длина сообщения должна быть от 1 до 300 символов"
};


class Chat extends React.Component {

  constructor( props ){
    super( props );
    this.state = { messages: [], online: 0, errors: [] };
    this.onScroll = this.onScroll.bind( this );
  }

  componentDidMount(){
    this.MessagesResource = new Resource( "Messages", { limit: 30 } );
    this.OnlineResource   = new Resource( "Online" );
    this.MessagesResource
      .onChange( ( messages )=>{ this.setState({ messages }) } )
      .oneChange( ()=>{ window.scrollTo( 0, document.body.scrollHeight ); } );
    this.OnlineResource.onChange( ( online )=>{ this.setState({ online }) } );
    document.addEventListener( 'scroll', this.onScroll );
  }

  componentWillUnmount(){
    this.MessagesResource.destroy();
    this.OnlineResource.destroy();
    document.removeEventListener( 'scroll', this.onScroll );
  }

  onScroll( e ){
    if( this.scrollTop() === 0 ){
      let limit    = this.MessagesResource.get( "limit" );
      this.scrollX = this.scrollX || ( document.body.scrollHeight - 140 ) / limit * 10;
      this.MessagesResource
        .oneChange( ()=>{ window.scrollTo( 0, this.scrollX ) })
        .set({ limit: limit + 10 });
    }
  }

  scrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  onKeyUp( e ){
    if( e.keyCode !== 13) return;
    let input = e.target;
    Api.query( "Messages.new", { text: input.value } )
      .then(  ()=>{
        input.value = "";
        this.setState({ errors: [] });
      })
      .catch( ( errors )=>{ this.setState({ errors }); });
  }

  render(){
    return (
      <div className="chat">
        <div className="chat__toolbar">
          <span>{ Store.CurrentUserResource.data.name }</span><span>Онлайн { this.state.online }</span>
        </div>
        <div className="chat__messages">
          { this.state.messages.map( ( message )=>{ return <Message data={ message } key={ message.id } />; } ) }
        </div>
        <div className="chat__input">
          <input type="text" onKeyUp={ ( e )=> this.onKeyUp( e ) } placeholder="Введите сообщение и нажмите Enter для его отправки" />
          <div className="chat__errors">
            { this.state.errors.map( function( key ){ return errorsMsg[ key ]; }).join( ", " ) }
          </div>
        </div>
      </div>
    );
  }

}


export default Chat;
