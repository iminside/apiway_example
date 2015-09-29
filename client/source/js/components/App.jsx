import React               from "react";
import { Resource, Store } from "apiway";
import Auth                from "./Auth.jsx";
import Chat                from "./Chat.jsx";


class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = { auth: false };
  }

  componentWillMount(){
    Store.CurrentUserResource = new Resource( "CurrentUser" );
    Store.CurrentUserResource
      .onChange( ()=>{ this.setState({ auth: true });  })
      .onError(  ()=>{ this.setState({ auth: false }); });
  }

  componentWillUnmount(){
    Store.CurrentUserResource.destroy();
    delete Store.CurrentUserResource;
  }

  render(){
    return this.state.auth ? <Chat /> : <Auth />;
  }

}


export default App;
