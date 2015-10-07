# odyssey-client [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

[![NPM](https://nodei.co/npm/odyssey-client.png?downloads=true)](https://nodei.co/npm/odyssey-client/)

> Odyssey Client desktop application, Lets you access Odyssey Cloud. We use [NW.js](https://github.com/nwjs/nw.js) to run our software.


### Installation with NPM and GULP

##### GULP change plataform to build.
Inside gulpfile.js change this:
```shell
var nw = new NwBuilder({
    files: './*', 
	version: '0.12.3',
    platforms: ['win32'] //Change or add here the desired SO.
});
```
Default value: `['win32']`
Can be `['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']`


##### Build Odyssey Client
```shell
npm install odyssey-client
cd /path/to/folder/node_modules/odyssey-client/node_modules/.bin/       //Usually the folder where you used the command or inside your personal folder. 
gulp nw
```
#####If you have gulp installed globaly you can just cd to odyssey-client folder and do `gulp nw`

> 1) This will generate a the directory /build/[win32],[win64],[osx32]/ choose the one you specifiend inside 'gulpfile.js'.
> 2) Open the app and go!

##### Installation binary file.
> Only finale and stable releases will be put here.

- 2015-07-11 `expected first release.`

## Troubleshooting
Everything seems alright. :)

## Release History
- 2015-10-07    `0.0.2` Preview release.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://www.npmjs.com/package/odyssey-client
[npm-image]: https://badge.fury.io/js/odyssey-client.svg

[travis-url]: https://travis-ci.org/Santiago-vdk/Odyssey-Client
[travis-image]: https://travis-ci.org/Santiago-vdk/Odyssey-Client.svg?branch=master

[depstat-url]: https://david-dm.org/santiago-vdk/odyssey-client
[depstat-image]: https://david-dm.org/santiago-vdk/odyssey-client.svg