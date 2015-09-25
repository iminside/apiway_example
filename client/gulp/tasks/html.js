module.exports = function( gulp, $, _ ){

  if( _.watching ) gulp.watch( _.watching, bundle );

  function bundle(){

    $.util.log( "Building html..." );

    return gulp
      .src( _.source )
      .pipe( gulp.dest( _.public ) )
      .pipe( $.connect.reload() );

  };

  return bundle;

};
