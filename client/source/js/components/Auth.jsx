import React   from "react";
import Cookie  from "js.cookie";
import { Api } from "apiway";


let errorsMsg = {
  "Name blank":  "Имя не может быть пустым",
  "Name length": "Длина имени должна быть от 3 до 30 символов"
};


class Auth extends React.Component {

  constructor( props ){
    super( props );
    this.state = { errors: [] };
  }

  onKeyUp( e ){
    if( e.keyCode !== 13) return;
    Api.query( "Users.auth_by_name", { name: e.target.value } )
      .then( ( token  )=>{ Cookie.set( "token", token, {live: 30} ) }, ( errors )=>{ this.setState({ errors }) });
  }

  render(){
    return (
      <div className="auth">
        <div className="auth__form">
          <input  type="text" onKeyUp={ ( e )=> this.onKeyUp( e ) } placeholder="Введите имя и нажмите Enter" />
          <div className="auth__errors">
            {
              this.state.errors.map( function( key ){
                return <div key={ key }>{ errorsMsg[ key ] }</div>;
              })
            }
          </div>
        </div>
      </div>
    );
  }

}


export default Auth;
