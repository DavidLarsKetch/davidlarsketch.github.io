module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      'dist/bundle.js': ['js/main.js']
    },
    jshint: {
      files: ["js/**/*.js"],
      options: {
        predef: ["document", "console"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          "stylesheets/main.css": "sass/main.scss"
        }
      }
    },
    watch: {
      javascripts: {
        files: ["js/**/*.js"],
        tasks: ["jshint", "browserify"]
      },
      sass: {
        files: ["sass/**/*.scss"],
        tasks: ["sass"]
      }
    }
  });

  require("matchdep")
    .filter("grunt-*")
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ['jshint', 'sass', 'browserify', 'watch']);
};
