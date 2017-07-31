$(function() {
    var List = require('collections/list');

    var Promise = require('bluebird');
    var adb = require('adbkit');
    var client = adb.createClient();
    
    var $title = $('.title');
    var $interval = $('.ui.dropdown');
    $interval.dropdown();

    var $totalUsage = $('#totalUsage');
    var $totalUSRUsage = $('#totalUSRUsage');
    var $totalSYSUsage = $('#totalSYSUsage');

    var $cpu0TotalUsage = $('#cpu0TotalUsage');
    var $cpu1TotalUsage = $('#cpu1TotalUsage');
    var $cpu2TotalUsage = $('#cpu2TotalUsage');
    var $cpu3TotalUsage = $('#cpu3TotalUsage');

    var $cpu0USRUsage = $('#cpu0USRUsage');
    var $cpu1USRUsage = $('#cpu1USRUsage');
    var $cpu2USRUsage = $('#cpu2USRUsage');
    var $cpu3USRUsage = $('#cpu3USRUsage');

    var $cpu0SYSUsage = $('#cpu0SYSUsage');
    var $cpu1SYSUsage = $('#cpu1SYSUsage');
    var $cpu2SYSUsage = $('#cpu2SYSUsage');
    var $cpu3SYSUsage = $('#cpu3SYSUsage');

    var prev_cpuUsage = new List();
    var cpu = {
        total : 0,
        usr : 0,
        sys : 0,
        idle : 0
    }
    for (var i = 0; i < 5; i++) {
        prev_cpuUsage.add(cpu);    
    }

    var trackDevice = () => {
        client.trackDevices().then(function(tracker){
            tracker.on('add', function(device) {
                $title.html(device.id);
                console.log('Device %s was plugged in', device.id);
            })
            tracker.on('remove', function(device) {
                $title.html("No device connected");
                console.log('Device %s was unplugged', device.id);
            })
        })
    }

    var showCpuUsage = () => {
        var cur_cpuUsage = new List();
        var cpuUsage = new List();
        
        var cmd = 'cat /proc/stat';
        client.shell($title.html(), cmd).then(adb.util.readAll).then(function(output) {
            var result = output.toString().trim().split(' ');
            
            for (var i = 0; i < 5; i++) {
                var usr = parseInt(result[2 + (10*i)]);
                var nice = parseInt(result[3 + (10*i)]);
                var sys = parseInt(result[4 + (10*i)]);
                var idle = parseInt(result[5 + (10*i)]);
                var total = usr + sys + nice + idle;
                        
                var cpu = {
                    total : total,
                    usr : usr+nice,
                    sys : sys,
                    idle : idle
                }
                cur_cpuUsage.add(cpu);
            }

            var cur_cpus = cur_cpuUsage.toJSON();
            var prev_cpus = prev_cpuUsage.toJSON();
            
            for (var j = 0; j < 5; j++) {
                var totalUsage = ((cur_cpus[j].total - prev_cpus[j].total) - (cur_cpus[j].idle - prev_cpus[j].idle)) / (cur_cpus[j].total - prev_cpus[j].total) * 100;
                var usrUsage = (cur_cpus[j].usr - prev_cpus[j].usr) / (cur_cpus[j].total - prev_cpus[j].total) * 100;
                var sysUsage = (cur_cpus[j].sys - prev_cpus[j].sys) / (cur_cpus[j].total - prev_cpus[j].total) * 100;
                var cpus = {
                    totalUsage : totalUsage.toFixed(3),
                    usrUsage : usrUsage.toFixed(3),
                    sysUsage : sysUsage.toFixed(3)
                }
                cpuUsage.add(cpus);
            }

            prev_cpuUsage = cur_cpuUsage;
            
           

            var cpus = cpuUsage.toJSON();
            $totalUsage.html(cpus[0].totalUsage);
            $totalUSRUsage.html(cpus[0].usrUsage);
            $totalSYSUsage.html(cpus[0].sysUsage);

            $cpu0TotalUsage.html(cpus[1].totalUsage);
            $cpu0USRUsage.html(cpus[1].usrUsage);
            $cpu0SYSUsage.html(cpus[1].sysUsage);
            
            $cpu1TotalUsage.html(cpus[2].totalUsage);
            $cpu1USRUsage.html(cpus[2].usrUsage);
            $cpu1SYSUsage.html(cpus[2].sysUsage);

            $cpu2TotalUsage.html(cpus[3].totalUsage);
            $cpu2USRUsage.html(cpus[3].usrUsage);
            $cpu2SYSUsage.html(cpus[3].sysUsage);

            $cpu3TotalUsage.html(cpus[4].totalUsage);
            $cpu3USRUsage.html(cpus[4].usrUsage);
            $cpu3SYSUsage.html(cpus[4].sysUsage);
        })
    }

    var $cpu0Freq = $('#cpu0Freq');
    var $cpu2Freq = $('#cpu2Freq');

    var showcpuFreq = () => {
        
        // cat sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
        // cat sys/devices/system/cpu/cpu2/cpufreq/scaling_cur_freq

        if($title.html() !== ' ') {
            var cmd = 'cat sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq;echo /;cat sys/devices/system/cpu/cpu2/cpufreq/scaling_cur_freq;ehco /;';
            client.shell($title.html(), cmd).then(adb.util.readAll).then(function(output) {
                var result = output.toString().trim().split('/');
                
                $cpu0Freq.html(result[0]);
                $cpu2Freq.html(result[1]);
            })
        }
        
    }

    var $cpus = $('#cpus');
    var $foreground = $('#foreground');
    var $background = $('#background');
    var $systemBackground = $('#system-background');
    var $topApp = $('#top-app');

    var showCPUSETs = () => {
        
        //cat /dev/cpuset/cpus
        //cat /dev/cpuset/foreground/cpus
        //cat /dev/cpuset/background/cpus
        //cat /dev/cpuset/system-background/cpus
        //cat /dev/cpuset/top-app/cpus

        if($title.html() !== ' ') {
            var cmd = 'cat /dev/cpuset/cpus;echo /;cat /dev/cpuset/foreground/cpus;echo /;cat /dev/cpuset/background/cpus;echo /;cat /dev/cpuset/system-background/cpus;echo /;cat /dev/cpuset/top-app/cpus;';
            client.shell($title.html(), cmd).then(adb.util.readAll).then(function(output) {
                var result = output.toString().trim().split("/");

                $cpus.html(result[0]);
                $foreground.html(result[1]);
                $background.html(result[2]);
                $systemBackground.html(result[3]);
                $topApp.html(result[4]);
            })
        }
    }

    var $f_process = $('#f_process');
    var $b_process = $('#b_process');
    var $sb_process = $('#sb_process');
    var $t_process = $('#t_process');

    var showCPUSETs_process = () => {
        // cat /dev/cpuset/foreground/tasks
        // cat /dev/cpuset/background/tasks
        // cat /dev/cpuset/system-background/tasks
        // cat /dev/cpuset/top-app/tasks
        if($title.html() !== ' ') {
            var cmd = 'cat /dev/cpuset/foreground/tasks;echo /;cat /dev/cpuset/background/tasks;echo /;cat /dev/cpuset/system-background/tasks;echo /;cat /dev/cpuset/top-app/tasks'
            client.shell($title.html(), cmd).then(adb.util.readAll).then(function(output) {
                var result = output.toString().trim().split("/");

                $f_process.html(result[0]);
                $b_process.html(result[1]);
                $sb_process.html(result[2]);
                $t_process.html(result[3]);
            })
        }
    }

    trackDevice();
    var showInterval = setInterval(function() {
        showCpuUsage();
        showcpuFreq();
        showCPUSETs();
        showCPUSETs_process();
    }, 2000);
    
})