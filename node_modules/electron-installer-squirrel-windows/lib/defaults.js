var path = require('path');

const ICON_URL = 'https://raw.githubusercontent.com/atom/electron/'
  + 'master/atom/browser/resources/win/atom.ico';
const LOADING_GIF = path.resolve(__dirname, '..', 'resources', 'install-spinner.gif');
const ELECTRON_VERSION = '0.29.2';

module.exports.ICON_URL = ICON_URL;
module.exports.LOADING_GIF = LOADING_GIF;
module.exports.ELECTRON_VERSION = ELECTRON_VERSION;
