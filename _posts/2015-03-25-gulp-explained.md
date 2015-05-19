---
title: Gulp explained
tags: js gulp
---

>Gulp is a streaming JavaScript build system built with node.js; it leverages the power
of streams and code-over-configuration to automate, organize, and run development
tasks very quickly and efficiently. Its main features/advantages are: **automation, stream, code over config**.

If you didn't touch Gulp yet, go to Gulp's [get started page](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md), you should be in Gulp's world in minutes. Here we're going to walk you through [Gulp's API](https://github.com/gulpjs/gulp/blob/master/docs/API.md) to gain a better understanding of Gulp. This is vital important if you're going to do some development with Gulp, e.g. write your own plguin for Gulp.

## The starting point
Like any other build tool(make, ant, maven, grunt and etc.), gulp uses a `gulpfile.js` as its configuration, everything starts from here.

```js
//gulpfile.js
var gulp = require('gulp');
gulp.task('default', function(){
    console.log('hello gulp!');
});
```
## [gulp.task(name[, deps], fn)](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn)
As stated, task uses [orchestrator](https://github.com/orchestrator/orchestrator). If you want define task with multi dependences, these dependences tasks order is **guaranteed**.

As async operation is everywhere within javascript, the order preservation is based on the `code execution process`, the `return` statement, not the `finish of the task` as we think.

```js
var message = "N/A";
gulp.task('getMessage', function(){
    setTimeout(function(){
        message = "hello";
    }, 1000);
});
gulp.task('printMessage', function(){
    console.log(message);
});
gulp.task('default', ['getMessage', 'printMessage'], function(){
    console.log('hello gulp!');
});
//"N/A" is printed
```
We can fix this by making some `special return`(a promise or a stream):

```js
gulp.task('getMessage', function(){
    var deferred = require('q').defer();
    setTimeout(function(){
        message = "hello";
        deferred.resolve();
    }, 1000);
    return deferred;
});
```
In this case, the `deferred.resolve/stream.end` is the signal for task completion, which is what we want.

## [gulp.src(globs[, options])](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options)
Most of the plugins focus on the file manipulation, the first step is to get file content. `gulp.src` is used to read file(s) into stream, in format of [vinyl-fs](https://github.com/wearefractal/vinyl-fs), which is adapter for [vinyl](https://github.com/wearefractal/vinyl), just like node's `fs` for `file`.

Vinyl is a virtual file format:

```js
var vFile = require('vinyl');
var coffeeFile = new vFile({
  cwd: "/",
  base: "/test/",
  path: "/test/file.coffee",
  contents: new Buffer("test = 123")
});
```
With this in mind, we get to know how to parse the result of `gulp.src`:

```js
var myReadable = new stream.Writable({objectMode: true});
myReadable._write = function(chunk, encoding, callback){
    console.log(chunk._contents.toString());//chunk is the instance of vinyl
    callback();
};
gulp.task('src', function(){
    gulp.src('hello.txt')
        .pipe(myReadable);
});
//print the content of hello.txt: "hello world!"
```
*You'd better off get some knowledge of `node stream` if you don't know anything about it yet, [stream-handbook](https://github.com/substack/stream-handbook) is a kind of must read for stream.*

`gulp.src` uses [node-glob](https://github.com/isaacs/node-glob) for file matching. Like RegExp, self-descriptive, you won't need to check for the details in most of the case.

## [gulp.dest(path[, options])](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options)
In contrast with `gulp.src`, `gulp.dest` is used to store the output(write files) after all these processing.

```js
gulp.task('dest', function(){
    gulp.src('hello.txt')
        .pipe(uppercase)
        .pipe(gulp.dest('./dest'));
});
var uppercase = new require('stream').Transform({
  objectMode: true
});
uppercase._transform = function(chunk, encoding, callback) {
  chunk._contents = new Buffer(chunk._contents.toString().toUpperCase());
  this.push(chunk);
  callback();
};
// dest/hello.txt with content: "HELLO WORLD!"
```
Keep [vinyl](https://github.com/wearefractal/vinyl) format in mind when using `gulp.src` and `gulp.dest`.

## [gulp.watch(glob [, opts], tasks|callback)](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)
[gaze](https://github.com/shama/gaze) is the tool behind `gulp.watch`. It watches the files, in case of any change/add/delete, the attached actions(tasks or callback) will be triggered.

```js
gulp.task('watch-with-callback', function(){
    gulp.watch('hello.txt', function(event){
        //change event object is passed in
        console.log(event);
        //{ type: 'changed', path: 'path\to\hello.txt' }
    });
});
gulp.task('watch-with-task', function(){
    gulp.watch('hello.txt', ['task-change']);
});
gulp.task('task-change', function(callback){
    //have no access to the change event object
    console.log('changed!');
});
```

## Final words
The foundation of Gulp are `stream`, `vinly-fs`, `orchestrator`, `glob` and `gaze`, which make it efficient, consistent, easy to use.

New stuff are coming out everyday in the node community, most of them are built on top of other cool components, assembled, if I may say, there's no rocket science. The key to its success is the community(eco-system), from the community, grow with the communication. And one thing we cannot deny is that, the idea is the start point of success.
