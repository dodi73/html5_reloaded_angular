module.exports = grunt => {
	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns 
	require('load-grunt-tasks')(grunt);
// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'build.js'
        ],
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/css/<%= pkg.name %>.min.css': [
              'node_modules/bootstrap/dist/css/bootstrap.min.css',
              'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
              'src/css/**/*.css'
          ]
        }
      }
    },
    copy: {
      main: {
          files: [
              {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/fonts',
                src: '**',
                dest: 'build/fonts'
              },
              {
                expand: true,
                cwd: 'src/json',
                src: '**',
                dest: 'build/json'
              },
              {
                expand: true,
                cwd: 'src',
                src: '*.html',
                dest: 'build'
              }
            ]
      }
    },
    babel: {
        options: {
          sourceMap: false,
            presets: ['es2015']
        },
        main: {
            files: {
                "build.js": 'built.js'
            }
        },            
        local: {
            files: {
                'build/js/localStorageClass.js': 'src/js/localStorageClass.js'
            } 
        }
    },
    concat: {
        options: {
            separator: ';',
        },
        dist: {
            src: [
                'src/js/class/*.js',
                'src/js/*.js'
            ],
            dest: 'built.js',
        }
    },
    watch: {
      scripts: {
        files: ['src/js/**/*.js', 'src/css/**/*.css', 'src/**/*.html'],
        tasks: ['dev'],
        options: {
            spawn: false,
            event: ['changed', 'added', 'deleted']
        },
      },
      babel: {
        files: ['./src/js/localStorageClass.js'],
        tasks: ['local'],
        options: {
            spawn: false,
            event: ['changed', 'added', 'deleted']
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-cssmin');
//  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('babel');

  // Default task(s).
  grunt.registerTask('dev', ['concat', 'babel:main', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('local', ['babel:local']);
  grunt.registerTask('default', ['watch:babel']);
 
	
};
