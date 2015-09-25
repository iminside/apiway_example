var gulp    = require( "gulp" ),
    config  = require( "./config" ),
    plugins = require( "gulp-load-plugins" )( config.loader ),
    taskBody;


for( name in config.tasks ) {

  try{
    taskBody = require( "./tasks/" + name )( gulp, plugins, config.settings[ name ] );
  }catch( e ){
    taskBody = function(){};
  }

  gulp.task( name, config.tasks[ name ], taskBody );

}
