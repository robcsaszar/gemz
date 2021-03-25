module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      svgstore: {
        options: {
          cleanup: false,
          inheritviewbox: true,
          svg: {
            xmlns: 'http://www.w3.org/2000/svg',
            class: 'h-hide'
          }
        },
        default: {
          files: {
            '_includes/svg-defs.svg': ['images/svg/icons/*.svg']
          }
        },
      },
      watch: {
        scripts: {
          files: ['images/svg/**/*.svg'],
          tasks: ['svgstore'],
          options: {
            spawn: false,
          },
        },
      },
    });
  
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['watch']);
  
  };