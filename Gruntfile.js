/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                '<%= pkg.author.name %>\n' +
                ' * Licensed ' +
                '<%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                ' */\n'
        },
        jquerymanifest: {
            options: {
                source: grunt.file.readJSON('package.json'),
                overrides: {
                    name: 'formatDateTime',
                    title: '<%= jquerymanifest.options.source.main %>',
                    author: '<%= jquerymanifest.options.source.author %>',
                    dependencies: {
                        jquery: ">=1.5"
                    },
                    licenses: '<%= jquerymanifest.options.source.licenses %>',
                    docs: 'https://github.com/agschwender/<%= pkg.main %>/blob/<%= pkg.version %>/README.md',
                    download: 'https://github.com/agschwender/<%= pkg.main %>/archive/<%= pkg.version %>.zip',
                }
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= pkg.main %>.js'],
                dest: 'dist/<%= pkg.main %>.js'
            }
        },
        jasmine: {
            options: {
                specs: 'tests/test.js'
            },
            jQuery_1_5: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.5.2.js'
                }
            },
            jQuery_1_6: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.6.4.js'
                }
            },
            jQuery_1_7: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.7.2.js'
                }
            },
            jQuery_1_8: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.8.3.js'
                }
            },
            jQuery_1_9: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.9.1.js'
                }
            },
            jQuery_1_10: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.10.2.js'
                }
            },
            jQuery_1_11: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-1.11.1.js'
                }
            },
            jQuery_2_1: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-2.1.1.js'
                }
            },
            jQuery_latest: {
                src: '<%= pkg.main %>.js',
                options: {
                    vendor: 'http://code.jquery.com/jquery-latest.js'
                }
            }
        },
        watch: {
            files: ['Gruntfile.js', '<%= pkg.main %>.js', 'tests/**/*.js'],
            tasks: ['jshint:src', 'jasmine']
        },
        jshint: {
            src: ['Gruntfile.js', '<%= pkg.main %>.js', 'tests/**/*.js'],
            dist: ['dist/<%= pkg.main %>.js'],
            options: {
                curly: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                laxbreak: true,
                globals: {
                    jQuery: true,
                    define: true,
                    module: true
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                report: 'gzip'
            },
            dist: {
                files: {
                    'dist/<%= pkg.main %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jquerymanifest');

    // Default task.
    grunt.registerTask('default', [
        'jshint:src',
        'jasmine',
        'concat',
        'jshint:dist',
        'uglify',
        'jquerymanifest'
    ]);

    // Test
    grunt.registerTask('test', ['jshint:src', 'jasmine']);
};
