module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      'dist/bundle.js': ['assets/js/main.js']
    },
    jshint: {
      files: ["assets/js/**/*.js"],
      options: {
        predef: ["document", "console", "alert"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          "assets/stylesheets/styles.css": "assets/sass/styles.scss"
        }
      }
    },
    watch: {
      javascripts: {
        files: ["assets/js/**/*.js"],
        tasks: ["jshint", "browserify"]
      },
      sass: {
        files: ["assets/sass/**/*.scss"],
        tasks: ["sass"]
      }
    }
  });

  require("matchdep")
    .filter("grunt-*")
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ['jshint', 'sass', 'browserify', 'watch']);
};
