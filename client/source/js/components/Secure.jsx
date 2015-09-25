import React               from "react";
import { RouteHandler }    from "react-router";
import { Resource, Store } from "apiway";
import Auth                from "./Auth.jsx";


class Secure extends React.Component {

  constructor( props ){
    super( props );
    this.state = { auth: false };
  }

  componentWillMount(){
    Store.CurrentUserResource = new Resource( "CurrentUser" );
    Store.CurrentUserResource
      .onChange( ()=>{ if( !this.state.auth ) this.setState({ auth: true });  })
      .onError(  ()=>{ if(  this.state.auth ) this.setState({ auth: false }); });
  }

  componentWillUnmount(){
    Store.CurrentUserResource.destroy();
    delete Store.CurrentUserResource;
  }

  render(){
    return this.state.auth ? <RouteHandler /> : <Auth />;
  }

}


export default Secure;
