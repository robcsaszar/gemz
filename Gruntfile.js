module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      },
      svgstore: {
        options: {
          cleanup: false,
          inheritviewbox: true,
          svg: {
            xmlns: 'http://www.w3.org/2000/svg'
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
          files: ['icons/*.svg'],
          tasks: ['svgstore'],
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