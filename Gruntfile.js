"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            }
        },

        shell: {
            test: {
                options: {
                    stdout: true
                },
                command: ''
            }
        },

        sass: {
            options: {
                trace: true,
                style: 'compressed'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch: {

            css: {
                files: 'sass/*.scss',
                tasks: 'sass',
            },

            rsync: {
                tasks: 'rsync',
                files: ['.*', 'js/*', 'css/*', 'admin/*'],
            }
        },

        rsync: {
            options: {
                args: ['-avh'],
                exclude: ['.*/','node_modules'],
                recursive: true
            },
            prod: {
                options: {
                    src: './',
                    dest: '/var/www/andrewray.me/bellesey-blog',
                    host: 'aray',
                    syncDestIgnoreExcl: true
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rsync');

};
