"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vorpal = require("vorpal");
var child_process_1 = require("child_process");
var Update_1 = require("./Update");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var fuzzysearch = require("fuzzysearch");
var tipsJSON = fs_1.readFileSync('./tips.json', { encoding: 'utf-8' }).toString();
var allTips = JSON.parse(tipsJSON);
var allGitCommands = allTips.map(function (tip) { return tip.command; });
var allTitles = allTips.map(function (tip) { return tip.title; });
var vorpal = Vorpal();
function recurPropmpt(vorpal, gitCommand, parameters, result) {
    if (parameters.length === 0) {
        var commandToExecute_1 = gitCommand.tip;
        gitCommand.params.forEach(function (param, index) {
            commandToExecute_1 = commandToExecute_1.replace(param, result[index]);
        });
        vorpal.log("executing: " + chalk_1.green(commandToExecute_1));
        child_process_1.exec(commandToExecute_1, function (err, stdout, stderr) {
            if (err) {
                vorpal.log(chalk_1.red(err.message));
                return;
            }
            vorpal.log(stdout);
            vorpal.log(stderr);
        });
        return result;
    }
    vorpal.prompt({
        type: 'input',
        name: 'parameter',
        message: chalk_1.yellow(parameters[0]) + ": "
    }, function (promptResult) {
        if (promptResult.parameter) {
            return recurPropmpt(vorpal, gitCommand, parameters.slice(1).slice(), result.concat([promptResult.parameter]));
        }
    });
}
;
vorpal
    .command('list', 'list all git tips')
    .option('-c', 'show only commands')
    .action(function (arg, callback) {
    var _this = this;
    allTips.forEach(function (tip) {
        _this.log(chalk_1.yellow(tip.command));
        _this.log("description: " + tip.title);
        _this.log("command: " + tip.tip + "\n");
    });
    callback();
});
vorpal
    .command('search [query]')
    .option('-c', 'show only commands')
    .action(function (arg, callback) {
    var _this = this;
    var showOnlyCommand = arg.options && arg.options.c && (arg.options.c === true);
    if (arg.query) {
        var count_1 = 0;
        allTips.forEach(function (tip) {
            if (fuzzysearch(arg.query, tip.command.toLowerCase())) {
                _this.log(chalk_1.yellow(tip.command));
                if (!showOnlyCommand) {
                    _this.log("description: " + tip.title);
                    _this.log("command: " + tip.tip + "\n");
                }
                count_1++;
            }
        });
        if (count_1 > 0) {
            this.log(chalk_1.green("found " + count_1 + " tips"));
        }
    }
    callback();
});
vorpal
    .command('update', 'update git tips')
    .action(function (arg, callback) {
    this.log('updating git tips...');
    try {
        Update_1.updateList();
    }
    catch (e) {
        this.log(chalk_1.red('cannot update git tips right now: '));
        this.log(e);
    }
    finally {
        this.log(chalk_1.green('git tips list updated'));
    }
    callback();
});
vorpal
    .command('run [command]', 'run specific git tip')
    .autocomplete(allGitCommands)
    .action(function (arg, callback) {
    if (arg.command) {
        var gitCommand = allTips.find(function (command) { return (command.command === arg.command); });
        if (gitCommand) {
            this.log("> " + gitCommand.title);
            this.log(chalk_1.green(gitCommand.tip));
            var paramValues = recurPropmpt(this, gitCommand, gitCommand.params, []);
        }
        else {
            this.log('Command doesn\'t exists');
        }
    }
    else {
        this.log(chalk_1.yellow('No command found'));
    }
    callback();
});
vorpal
    .delimiter('gtip$')
    .show();
