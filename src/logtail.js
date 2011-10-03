var util = require("util"),
  colors = require("colors"),
  spawn = require("child_process").spawn,
  settings = require("./settings.js").settings,
  logfiles = [];

tail_out = function(data) {
    var lines = data.toString().split("\n");
    for (index in lines) {
        var line = lines[index];
        if (line == "") {
            continue;
        }

        var colors;
        var match = settings.lineRE.exec(line);
        if (match != null && match[1] in settings.fieldColors) {
            colors = settings.fieldColors[match[1]];
        } else {
            colors = settings.defaultColor;
        }
        colors.forEach(function(c) {
            line = line[c];
        });
        console.log(line);
    }
}

find_out = function(data) {
    var filenames = data.toString().split("\n");
    for (index in filenames) {
        var filename = filenames[index];
        if (filename == "" || logfiles.indexOf(filename) > -1) {
            continue;
        }
        console.log("Begin tailing %s", filename);
        var tail = spawn('tail', ['-f', filename]);
        tail.stdout.on("data", tail_out);

        logfiles.push(filename);
        }
}

interval = function() {
    settings.logDirs.push.apply(settings.logDirs, process.argv)
    //process.argv.forEach(function (val, index, array) {
    settings.logDirs.forEach(function (val, index, array) {
        find = spawn('find', [val, '-name', settings.logFileName]);
        find.stdout.on("data", find_out);
    });
}

interval();
setInterval(interval, 5000);
