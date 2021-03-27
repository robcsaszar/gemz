module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        targets: {
          options: {
            sourceMap: true,
            options: {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
          },
          files: {
            'assets/js/scripts.min.js': ['_js/scripts.js']
          }
        }
      },
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
            '_includes/svg-defs.svg': ['images/svg/**/*.svg']
          }
        },
      },
      watch: {
        scripts: {
          files: ['images/svg/**/*.svg','_js/*.js'],
          tasks: ['svgstore','uglify'],
          options: {
            spawn: false,
          },
        },
      },
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['watch']);
  
  };