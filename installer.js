var createInstaller = require('electron-installer-squirrel-windows');

createInstaller({
    name : 'cpuViewer',
    path: './dist/cpuViewer-win32-x64',
    out: './dist/installer',
    authors: 'Donggoo Jung',
    exe: 'cpuViewer.exe',
    appDirectory: './dist/cpuViewer-win32-x64',
    overwrite: true,
    setup_icon: 'favicon.ico'
}, function done (e) {
    console.log('Build success !!');
});