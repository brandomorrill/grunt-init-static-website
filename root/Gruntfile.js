/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    srcDir: 'src',
    deployDir: 'deploy',

    htmlSrc: '<%= srcDir %>',
    htmlDeploy: '<%= deployDir %>',
    
    jsSrc: '<%= srcDir %>/script',
    jsDeploy: '<%= deployDir %>/script',
    
    scssSrc: '<%= srcDir %>/sass',
    scssDeploy: '<%= deployDir %>/css',
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    copy: {
      main: {
        src: '<%= htmlSrc %>/*.html',
        dest: '<%= htmlDeploy %>',
        expand: true,
        flatten: true
      }
    },
    concat: {
      options: {
        stripBanners: true,
        separator: ';'
      },
      dist: {
        src: ['<%= jsSrc %>/*.js'],
        dest: '<%= jsDeploy %>/main.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= jsDeploy %>/main.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= scssDeploy %>/style.css': '<%= scssSrc %>/**/*.scss'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      sass: {
        files: '<%= scssSrc %>/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['copy', 'sass', 'jshint', 'concat', 'uglify']);

};
