"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
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
exports.runCommand = function (vorpal, allTips, allGitCommands) {
    return vorpal
        .command('run [command]', 'Run specific git tip')
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
};
