# Gulp Starter Pack
This package intended to solve common front-end development tasks. Works best for psd/sketch to html projects and save you a lot of time setting up local environment

## demo
https://discount.surge.sh


## How to start
* `npm install` or `yarn` - install npm dependencies
* `bower i`- install bower packages
* `gulp` - run dev-server
* `gulp build` - build project from sources

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:development`| build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. Included [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer), flexbugs and other cool [plugins](https://github.com/postcss/postcss#plugins) you might add
`pug`              | compile [pug](http://pug-js.com/) templates
`javascript`       | combines vendor files and custom .js code into separate files
`sprite:svg`       | create svg symbol sprites
`sprite:png`       | create png sprites
`images`           | optimize, minify and clone images
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./dist` folder
`copy`             | copy common files from `./src` path to `./dist` path
`list-pages`       | create index file with links to all project pages

All available tasks are placed in a folder `./gulp/tasks` as separate *.js files.

## Flags

* `gulp --open` or `gulp server --open` - run dev server and then open preview in browser
* `gulp --tunnel=[name]` or `gulp server --tunnel [name]` - runs dev server and allows you to easily share a web service on your local development machine (powered by [localtunnel.me](https://localtunnel.me/)). Your local site will be available at `[name].localtunnel.me`.
* `gulp [task_name] --prod` or `gulp [task_name] --production` - run task in production mode. Some of the tasks (like, sass or js compilation) have additional settings for production mode (such as code minification), so with this flag you can force production mode. `gulp build` uses this mode by default.

##Other
You can also use [npm scripts](https://docs.npmjs.com/misc/scripts):

* `npm run start` - same as `gulp default`.
* `npm run build` - same as `gulp build`.
* `npm run ghpages` to push only `./dist` folder to **gh-pages** branch on github (very useful for previews).


## Credits
The idea of structure was originally developed by [riverco.de](https::/riverco.de) studio. The best parts was taken, redesigned and adjusted to specific needs.

Original Gulp Starter Pack v.1 could be found of a separate branch
