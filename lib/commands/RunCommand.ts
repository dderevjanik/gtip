import { ParsedTip } from '../Types';
import { exec } from 'child_process';
import { yellow, green, red } from 'chalk';

function recurPropmpt(vorpal: any, gitCommand: ParsedTip, parameters: ReadonlyArray<string>, result: ReadonlyArray<string>) {
    if (parameters.length === 0) {
        let commandToExecute = gitCommand.tip;
        gitCommand.params.forEach((param, index) => {
            commandToExecute = commandToExecute.replace(param, result[index]);
        });
        vorpal.log(`executing: ${green(commandToExecute)}`);
        exec(commandToExecute, (err, stdout, stderr) => {
            if (err) {
                vorpal.log(red(err.message));
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
        message: `${yellow(parameters[0])}: `
    }, function (promptResult: { parameter: string }) {
        if (promptResult.parameter) {
            return recurPropmpt(
                vorpal,
                gitCommand,
                [...parameters.slice(1)],
                [...result, promptResult.parameter]
            );
        }
    });
};

export const runCommand = (vorpal: Vorpal, allTips: ParsedTip[], allGitCommands: string[]) =>
    vorpal
        .command('run [command]', 'run specific git tip')
        .autocomplete(allGitCommands)
        .action(function (arg, callback) {
            if (arg.command) {
                const gitCommand = allTips.find((command) => (command.command === arg.command));
                if (gitCommand) {
                    this.log(`> ${gitCommand.title}`);
                    this.log(green(gitCommand.tip));
                    const paramValues = recurPropmpt(this, gitCommand, gitCommand.params, []);
                } else {
                    this.log('Command doesn\'t exists');
                }
            } else {
                this.log(yellow('No command found'));
            }
            callback();
        });
