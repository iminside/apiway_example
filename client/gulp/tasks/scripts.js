module.exports = function( gulp, $, _ ){

  var bundler = $.browserify( _.source, _.browserify );

  if( _.watching ){
    bundler = $.watchify( bundler );
    bundler.on( "update", bundle );
  }

  function bundle(){

    $.util.log( "Building scripts..." );

    return bundler.bundle()
      .on( "error", $.util.log.bind( $.util, "Browserify Error" ) )
      .pipe( $.source( _.outFile ) )
      .pipe( $.buffer() )
      .pipe( $.if( _.sourcemapping, $.sourcemaps.init({ loadMaps: true }) ) )
      .pipe( $.if( _.compressing, $.uglify() ) )
      .pipe( $.if( _.sourcemapping, $.sourcemaps.write( "." ) ) )
      .pipe( gulp.dest( _.public ) )
      .pipe( $.connect.reload() );

  }

  return bundle;

};
