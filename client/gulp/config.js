var argv          = require( "yargs" ).argv,
    isProduction  = "production" in argv,
    watching      = argv.watching,
    source        = "./source",
    public        = "./public";


module.exports = {

  env: isProduction ? "production" : "development",

  loader: {
    pattern: [ "gulp-*", "gulp.*", "browserify", "reactify", "watchify", "del", "vinyl-source-stream", "vinyl-buffer" ],
    rename:  { "vinyl-source-stream": "source", "vinyl-buffer": "buffer" }
  },

  tasks: {
    default: [ "server" ],
    server:  [ "build" ],
    build:   [ "clean", "html", "scripts", "styles" ],
    watch:   [],
    clean:   [],
    html:    [],
    scripts: [],
    styles:  []
  },

  settings: {

    server: {
      root: public,
      host: "localhost",
      port: 8080,
      livereload: {
        port: 35929
      }
    },

    clean: {
      files: [ public + "js/**/*.*", public + "css/**/*.*" ]
    },

    html: {
      source:   source + "/index.html",
      public:   public,
      watching: watching && source + "/**/*.html"
    },

    scripts: {
      source:        source + "/js/app.js",
      public:        public + "/js",
      outFile:       "app.js",
      sourcemapping: !isProduction,
      compressing:   isProduction,
      watching:      watching,
      browserify: {
        cache:        {},
        packageCache: {},
        fullPaths:    false,
        transform: [
          [ "babelify" ]
        ],
        debug:        true
      }
    },

    styles: {
      source: source + "/css/app.{sass,scss,css}",
      public: public + "/css",
      sourcemapping: !isProduction,
      watching: watching && source + "/**/*.{css,scss,sass}",
      sass: {
        outFile:        "app.css",
        indentedSyntax: false,
        imagePath:      "/images",
        outputStyle:    isProduction ? "compressed" : "nested"
      },
      autoprefixer: {
        browsers: [ "last 3 version" ]
      }
    }

  }


}

