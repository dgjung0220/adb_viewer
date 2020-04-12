# adb_viewer

_**Android CPU & CPUSET Viewer by using [electorn][electron], [adbkit][adbkit]. For more information, see the [Blog][bearpot-post]**_

**adb_viewer** is a realtime android resource viewer (CPU Usage, CPU Frequency, CPUSET Configuration, Running process by cpuset) using [Node.js][nodejs], [electron][electron] and [adbkit][adbkit]. It work at Quad Core Processor. (LG V10,V20,G5,G6, Google Pixel)

**CPUSET Viewer** function is only able to use Daydream ready Android phone(Google Pixel), or you can easily enable CPUSETs kernel feature.

## Requirements

* [Node.js][nodejs] >= 6.0

## node modules

#### dependencies

* adbkit
* collections
* bluebird 
* electron-pug

#### devDependenices

* asar
* electron
* electron-installer-squirrel-windows
* electron-packager

## Getting started

```bash
git clone https://github.com/dgjung0220/adb_viewer.git
cd adb_viewer
npm start
```

## adb command line

#### Show each core's CPU Usage & Frequency
```js
cat /proc/stat
cat /sys/devices/system/cpu/cpuX/cpufreq/scaling_cur_freq
```
#### Show CPUSETs Setting Configuration
```js
cat /dev/cpuset/cpus
cat /dev/cpuset/foreground/cpus
cat /dev/cpuset/background/cpus
cat /dev/cpuset/system-background/cpus
cat /dev/cpuset/top-app/cpus
```
#### Show running process by CPUSETs
```js
cat /dev/cpuset/foreground/tasks
cat /dev/cpuset/background/tasks
cat /dev/cpuset/system-background/tasks
cat /dev/cpuset/top-app/tasks
```

You can find more information in my blog(in Korean) [post][bearpot-post]

## make execute file(.exe) & zipping

add below scripts code in package.json, it will start after starting program.
```js
"scripts": {    
    "start": "electron .",
    "poststart" : "electron-packager . cpuViewer --asar --platform win32 --arch x64 --out dist/"
},
```

## make installer file(setup.exe)
```bash
cd adb_viewer
node installer.js
```
You can find ./dist/installer folder extension in project file.

## License
ISC License.
Copyright © 2017, [Donggoo Jung][bearpot]

[nodejs]: <http://nodejs.org/>
[electron]: <http://electron.atom.io>
[adbkit]: <https://github.com/openstf/adbkit>
[bearpot-post]: <https://dgjung.me/electron/2020/04/12/adb_viewer_electron/>
[bearpot]: <http://dgjung.me>