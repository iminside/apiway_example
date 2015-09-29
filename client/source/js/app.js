import React   from "react";
import { Api } from "apiway";
import Cookie  from "js.cookie";
import App     from "./components/App.jsx";


Api
  .connect( `ws://localhost:3000`, { aliveDelay: 5000 } )
  .beforeReadyPromise( function(){

    return Api.query( "Users.auth_by_token", { token: Cookie.get( "token" ) } );

  })
  .oneReady( function( e ){

    React.render( <App />, document.getElementById( "app" ) );

  });
