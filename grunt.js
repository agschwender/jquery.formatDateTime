/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                ' */'
        },
        jqueryjson: {
            name: 'formatDateTime'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:<%= pkg.name %>.js>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            files: ['tests/**/*.html']
        },
        lint: {
            files: ['grunt.js', '<%= pkg.name %>.js', 'tests/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },
        jshint: {
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
                laxbreak: true
            },
            globals: {
                jQuery: true
            }
        },
        uglify: {}
    });

    grunt.loadNpmTasks('grunt-jquery-json');

    // Default task.
    grunt.registerTask('default', 'lint qunit concat min jquery-json');

    // Travis CI task.
    grunt.registerTask('travis', 'lint qunit');
};
