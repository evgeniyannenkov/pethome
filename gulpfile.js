// ## Globals
const argv = require('minimist')(process.argv.slice(2));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const checkFilesize = require("gulp-check-filesize");
const childProcess = require("child_process");
const flatten = require('gulp-flatten');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const insert = require('gulp-insert');
const jshint = require('gulp-jshint');
const lazypipe = require('lazypipe');
const less = require('gulp-less');
const merge = require('merge-stream');
const nodemon = require('gulp-nodemon');
const cssNano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const rev = require('gulp-rev');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concatFilenames = require('gulp-concat-filenames');
const notify = require("gulp-notify");
const watch = require('gulp-watch');
const modifyCssUrls = require('gulp-modify-css-urls');
const pug = require('gulp-pug');

// See https://github.com/austinpray/asset-builder
const manifest = require('asset-builder')('./assets/manifest.json');

// `path` - Paths to base asset directories. With trailing slashes.
// - `path.source` - Path to the source files. Default: `assets/`
// - `path.dist` - Path to the build directory. Default: `dist/`
const path = manifest.paths;

const files = {
    main_sass : 'main.scss',
    libs_sass : 'libs.scss',
    libs_less : 'libs.less',
    critical_sass : 'critical-path.scss',
    main_js : 'main.js'
};

const sassPaths = {
    blocksFolder : './assets/styles/blocks',
    stylesFolder : './assets/styles',
    sassFiles : [
        './assets/styles/common/**/*.scss',
        './assets/styles/components/**/*.scss',
        './assets/styles/layouts/**/*.scss',
        './assets/styles/blocks/**/*.scss',
        '!./assets/styles/blocks/**/_*.scss',
        '!./assets/styles/main.scss'
    ],
    excludedCriticalPathFiles : [
        '!./assets/styles/blocks/*--cp/*.scss',
        '!./assets/styles/**/*--cp.scss'
    ],
    criticalPathFiles : [
        './assets/styles/blocks/*--cp/*.scss',
        './assets/styles/**/*--cp.scss',
        '!./assets/styles/blocks/**/_*.scss'
    ]
};

// `config` - Store arbitrary configuration values here.
const config = manifest.config || {};

// `globs` - These ultimately end up in their respective `gulp.src`.
// - `globs.js` - Array of asset-builder JS dependency objects. Example:
//   ```
//   {type: 'js', name: 'main.js', globs: []}
//   ```
// - `globs.css` - Array of asset-builder CSS dependency objects. Example:
//   ```
//   {type: 'css', name: 'main.css', globs: []}
//   ```
// - `globs.fonts` - Array of font path globs.
// - `globs.images` - Array of image path globs.
// - `globs.bower` - Array of all the main Bower files.
const globs = manifest.globs;

// `project` - paths to first-party assets.
// - `project.js` - Array of first-party JS assets.
// - `project.css` - Array of first-party CSS assets.
const project = manifest.getProjectGlobs();

// CLI options
const enabled = {
    // Enable static asset revisioning when `--production`
    rev : argv.production,
    // Disable source maps when `--production`
    maps : !argv.production,
    // Fail styles task on error when `--production`
    failStyleTask : argv.production,
    // Fail due to JSHint warnings only when `--production`
    failJSHint : argv.production,
    // Strip debug statments from javascript when `--production`
    stripJSDebug : argv.production,
    // Run browserSync on watch when `--sync`
    browserSync : argv.sync,
    // Disable notify messages when `--server`
    notify : !argv.server
};

// Path to the compiled assets manifest in the dist directory
const revManifest = path.dist + 'assets.json';

const getCleanFileName = function ( url ) {
    const fileNameStart = url.lastIndexOf("/") + 1;
    const fileName = url.substring(fileNameStart);

    return fileName.split('?')[0];
};

const isInBowerFiles = function ( cleanFileName, bowerFiles ) {

    const filtered = bowerFiles.filter(function ( file ) {
        return file.indexOf(cleanFileName) !== -1;
    });

    return filtered.length !== 0;
};

const cssTasks = function ( filename ) {
    return lazypipe()
        .pipe(function () {
            return gulpif(!enabled.failStyleTask, plumber());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        // .pipe(function () {
        //     return gulpif('*.less', less());
        // })
        .pipe(function () {
            return gulpif('*.scss', sass({
                outputStyle : 'nested', // libsass doesn't support expanded yet
                precision : 10,
                includePaths : ['.'],
                errLogToConsole : !enabled.failStyleTask
            }));
        })
        .pipe(concat, filename)
        .pipe(autoprefixer, {
            browsers : [
                'last 2 versions',
                'android 4',
                'opera 12'
            ]
        })
        .pipe(function () {
            return modifyCssUrls({
                modify : function ( url ) {
                    if ( !url.startsWith('http') ) {
                        return '../' + url;
                    }
                    return url;
                }
            });
        })
        .pipe(function () {
            return modifyCssUrls({
                modify : function ( url, filePath ) {
                    const cleanFileName = getCleanFileName(url);
                    if ( isInBowerFiles(cleanFileName, globs.fonts.concat(globs.images)) ) {
                        return '../fonts/' + cleanFileName;
                    }
                    return url;
                }
            });
        })
        .pipe(cssNano, {
            safe : true
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
                return gulpif(enabled.notify && filename === 'main.css', notify({
                    message : "Generated file: <%= file.relative %>"
                }));
            }
        )
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot : 'assets/styles/'
            }));
        })();
};

// ### Critical processing pipeline
// Example
// ```
// gulp.src(criticalFiles)
//   .pipe(criticalTasks('critical.css')
//   .pipe(gulp.dest(path.dist + 'critical'))
// ```
const criticalTasks = function ( filename ) {
    return lazypipe()
        .pipe(function () {
            return gulpif(!enabled.failStyleTask, plumber());
        })
        .pipe(function () {
            return gulpif('*.scss', sass({
                outputStyle : 'nested', // libsass doesn't support expanded yet
                precision : 10,
                includePaths : ['.'],
                errLogToConsole : !enabled.failStyleTask
            }));
        })
        .pipe(concat, filename)
        .pipe(autoprefixer, {
            browsers : [
                'last 2 versions',
                'android 4',
                'opera 12'
            ]
        })
        .pipe(cssNano, {
            safe : true
        })
        .pipe(function () {
            return modifyCssUrls({
                modify : function ( url ) {
                    if ( !url.startsWith('http') ) {
                        return '<?php echo get_template_directory_uri() . "/dist/" ?>' + url;
                    }
                    return url;
                }
            });
        })
        .pipe(function () {
                return insert.wrap('<style>', '</style>');
            }
        )
        .pipe(function () {
                return rename(filename.replace('.css', '') + '.php');
            }
        )
        .pipe(function () {
                return checkFilesize({
                    fileSizeLimit : 10240
                });
            }
        )
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })();
};

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(path.dist + 'scripts'))
// ```
const jsTasks = function ( filename ) {
    return lazypipe()
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(concat, filename)
        .pipe(function () {
            return gulpif(filename === files.main_js, babel({
                presets : [
                    'es2015'
                ]
            }));
        })
        .pipe(uglify, {
            compress : {
                'drop_debugger' : enabled.stripJSDebug
            }
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
                return gulpif(enabled.notify && filename === files.main_js, notify({
                    message : "Generated file: <%= file.relative %>"
                }));
            }
        )
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot : 'assets/scripts/'
            }));
        })();
};

// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
const writeToManifest = function ( directory ) {
    return lazypipe()
        .pipe(gulp.dest, path.dist + directory)
        .pipe(browserSync.stream, {match : '**/*.{js,css}'})
        .pipe(rev.manifest, revManifest, {
            base : path.dist,
            merge : true
        })
        .pipe(gulp.dest, path.dist)();
};

// ## Gulp tasks
// Run `gulp -T` for a task summary

const blocksList = function ( config ) {
    return gulp.src(config.files)
               .pipe(concatFilenames(config.blocksFile, {
                   root : 'assets/styles',
                   prepend : '@import "',
                   append : '";'
               }))
               .pipe(gulp.dest(config.dest));
};

const libsList = function ( config ) {
    return gulp.src(config.files)
               .pipe(concatFilenames(config.blocksFile, {
                   root : './',
                   prepend : '@import "../../',
                   append : '";'
               }))
               .pipe(gulp.dest(config.dest));
};

const getLibsFiles = function ( extention ) {
    const paths = [];
    for ( let i = 0; i < globs.bower.length; i++ ) {
        if ( globs.bower[i].indexOf(extention) !== -1 ) {
            paths.push(globs.bower[i]);
        }
    }
    return paths;
};

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('sass:import:libs', function () {
    return libsList({
        files : getLibsFiles('.scss'),
        dest : path.source + "styles",
        blocksFile : files.libs_sass
    });
});

gulp.task('less:import:libs', function () {
    return libsList({
        files : getLibsFiles('.less'),
        dest : path.source + "styles",
        blocksFile : files.libs_less
    });
});

gulp.task('sass:import:build', function () {
    return blocksList({
        files : sassPaths.sassFiles.concat(sassPaths.excludedCriticalPathFiles),
        dest : path.source + "styles",
        blocksFile : files.main_sass
    });
});

gulp.task('sass:import:watch', function () {
    return blocksList({
        files : sassPaths.sassFiles,
        dest : path.source + "styles",
        blocksFile : files.main_sass
    });
});

gulp.task('styles', ['sass:import:libs', 'less:import:libs'], function () {
    const merged = merge();
    manifest.forEachDependency('css', function ( dep ) {
        if ( !dep.name.startsWith('critical') ) {
            const cssTasksInstance = cssTasks(dep.name);
            if ( !enabled.failStyleTask ) {
                cssTasksInstance.on('error', function ( err ) {
                    console.error(err.message);
                    this.emit('end');
                });
            }
            merged.add(gulp.src(dep.globs, {base : 'styles'})
                           .pipe(cssTasksInstance));
        }
    });

    return merged
        .pipe(writeToManifest('styles'));
});

gulp.task('styles:watch', function () {
    const dep = manifest.getDependencyByName('main.css');
    gulp.src(dep.globs)
        .pipe(cssTasks(dep.name).on('error', function ( err ) {
            console.error(err.message);
            this.emit('end');
        }))
        .pipe(writeToManifest('styles'));
});

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', function () {
    const merged = merge();
    manifest.forEachDependency('js', function ( dep ) {
        merged.add(
            gulp.src(dep.globs, {base : 'scripts'})
                .pipe(jsTasks(dep.name))
        );
    });
    return merged
        .pipe(writeToManifest('scripts'));
});

gulp.task('scripts:watch', function () {
    const dep = manifest.getDependencyByName(files.main_js);
    gulp.src(dep.globs)
        .pipe(jsTasks(dep.name))
        .pipe(writeToManifest('scripts'));
});

// ### Critical
// `gulp critical` - Combine Critical Styles to from globs to critical folder in paths.dest
gulp.task('critical', function () {
    manifest.forEachDependency('css', function ( dep ) {
        if ( dep.name.startsWith('critical') ) {
            const criticalTasksInstance = criticalTasks(dep.name);
            if ( !enabled.failStyleTask ) {
                criticalTasksInstance.on('error', function ( err ) {
                    console.error(err.message);
                    this.emit('end');
                });
            }
            gulp.src(dep.globs)
                .pipe(criticalTasksInstance)
                .pipe(writeToManifest('critical'));
        }
    });
});

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function () {
    return gulp.src(globs.fonts)
               .pipe(flatten())
               .pipe(gulp.dest(path.dist + 'fonts'))
               .pipe(browserSync.stream());
});

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function () {
    return gulp.src(globs.images)
               .pipe(gulp.dest(path.dist + 'images'))
               .pipe(browserSync.stream());
});

// ### Templates
gulp.task('templates', function buildHTML () {
    return gulp.src(['assets/templates/**/*.pug'])
               .pipe(pug())
               .pipe(gulp.dest(path.dist + 'templates'))
               .pipe(browserSync.stream());
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function () {
    return gulp.src([
        'bower.json', 'gulpfile.js'
    ].concat(project.js))
               .pipe(jshint({
                   esversion : 6
               }))
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [
        path.dist,
        path.source + 'styles/' + files.main_sass,
        path.source + 'styles/' + files.libs_sass,
        path.source + 'styles/' + files.libs_less,
    ]
));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', ['clean'], function () {
    runSequence(
        'sass:import:watch',
        'build-operations',
        'mongo-start'
    );

    if ( enabled.browserSync ) {
        browserSync.init({
            files : ['{lib,templates}/**/*.php', '*.php'],
            proxy : config.devUrl,
            snippetOptions : {
                whitelist : ['/wp-admin/admin-ajax.php'],
                blacklist : ['/wp-admin/**']
            }
        });
    }

    watch([path.source + 'styles/**/*', '!' + path.source + 'styles/main.scss', '!' + path.source + 'styles/libs.scss'], function ( events ) {
        if ( 'add' === events.event || 'unlink' === events.event ) {
            return runSequence(
                'sass:import:watch',
                'styles:watch'
            );
        }
        if ( 'change' === events.event ) {
            return runSequence(
                'styles:watch'
            );
        }
    });

    watch([path.source + 'scripts/**/*'], function ( events ) {
        if ( 'add' === events.event || 'unlink' === events.event ) {
            return runSequence(
                'scripts:watch'
            );
        }
        if ( 'change' === events.event ) {
            return runSequence(
                // 'jshint',
                'scripts:watch'
            );
        }
    });

    watch([path.source + 'templates/**/*', './views/mixins/**/*', './views/partials/**/*', './views/vars/**/*'], function ( events ) {
        if ( 'add' === events.event || 'unlink' === events.event || 'change' === events.event ) {
            return runSequence(
                'templates'
            );
        }
    });

    gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
    gulp.watch([path.source + 'images/**/*'], ['images']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', ['clean'], function ( callback ) {
    runSequence(
        'sass:import:build',
        'build-operations',
        callback);
});

gulp.task('build-operations', function ( callback ) {
    runSequence(
        'styles',
        'scripts',
        'critical',
        ['fonts', 'images', 'templates'],
        'server-start',
        callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', function () {
    gulp.start('watch');
});

gulp.task('mongo-start', function () {
    childProcess.exec('mongod', function ( err, stdout, stderr ) {
        console.log(stdout);
    });
});

gulp.task('server-start', function () {
    nodemon({
        script : './bin/www',
        ignore : [
            'node_modules',
            'bower_components',
            'dist',
            'gulpfile.js',
            'bower.json',
            'package.json',
            'npm-debug.log.*',
            '.gitignore',
            '.env'
        ]
    })
        .on('restart', function () {
            console.log('server is restarted...')
        })
});