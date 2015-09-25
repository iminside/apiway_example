module.exports = function( gulp, $, _ ){

  if( _.watching ) gulp.watch( _.watching, bundle );

  function bundle(){

    $.util.log( "Building styles..." );

    return gulp.src( _.source )
      .pipe( $.if( _.sourcemapping, $.sourcemaps.init({ loadMaps: true }) ) )
      .pipe( $.sass( _.sass ) )
      .on( "error", $.util.log.bind( $.util, "Styles Error" ) )
      .pipe( $.autoprefixer( _.autoprefixer ) )
      .pipe( $.if( _.sourcemapping, $.sourcemaps.write( "." ) ) )
      .pipe( gulp.dest( _.public ) )
      .pipe( $.connect.reload() );

  };

  return bundle;

};
