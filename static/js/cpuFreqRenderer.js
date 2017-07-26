$(function() {
    var Promise = require('bluebird');
    var adb = require('adbkit');
    var client = adb.createClient();

    var $cpu0Freq = $('#cpu0Freq');
    var $cpu1Freq = $('#cpu1Freq');
    var $cpu2Freq = $('#cpu2Freq');
    var $cpu3Freq = $('#cpu3Freq');

    var $title = $('.title');

    var showcpuFreq = () => {
        console.log($title);
    }
})