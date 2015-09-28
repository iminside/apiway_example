import React   from "react";
import Router  from "react-router";
import { Api } from "apiway";
import Cookie  from "js.cookie";
import Secure  from "./components/Secure.jsx";
import Chat    from "./components/Chat.jsx";


let { Route } = Router;


let routes = (
  <Route   path="/" handler={ Secure } >
    <Route path="/" handler={ Chat } />
  </Route>
);


Api
  .connect( `ws://${ window.location.hostname }:3000`, { aliveDelay: 5000 } )
  .beforeReadyPromise( function(){

    return Api.query( "Users.auth_by_token", { token: Cookie.get( "token" ) } );

  })
  .oneReady( function( e ){

    Router.run( routes, function( Handler ){
      React.render( <Handler />, document.getElementById( "app" ) );
    });

  });
