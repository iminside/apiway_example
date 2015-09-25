module.exports = function( gulp, $, _ ){

  return function( callback ){

    $.del( _.files, callback );

  };

};
