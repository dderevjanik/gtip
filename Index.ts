import * as Vorpal from 'vorpal';
import { exec } from 'child_process';
import { updateList } from './Update';
import { readFileSync } from 'fs';
import { yellow, green, red, grey } from 'chalk';
import { ParsedTip } from './Types';
import * as fuzzysearch from 'fuzzysearch';


const tipsJSON = readFileSync('./tips.json', { encoding: 'utf-8' }).toString();
const allTips: ParsedTip[] = JSON.parse(tipsJSON);
const allGitCommands = allTips.map(tip => tip.command);
const allTitles = allTips.map(tip => tip.title);

const vorpal = Vorpal();

function recurPropmpt(vorpal: any, gitCommand: ParsedTip, parameters: ReadonlyArray<string>, result: ReadonlyArray<string>) {
    if (parameters.length === 0) {
        let commandToExecute = gitCommand.tip;
        gitCommand.params.forEach((param, index) => {
            commandToExecute = commandToExecute.replace(param, result[index]);
        });
        vorpal.log(`executing: ${green(commandToExecute)}`);
        exec(commandToExecute);
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

vorpal
    .command('list', 'list all git tips')
    .option('-c', 'show only commands')
    .action(function (arg: { options: { c: boolean } }, callback) {
        allTips.forEach(tip => {
            this.log(yellow(tip.command));
            this.log(`description: ${tip.title}`);
            this.log(`command: ${tip.tip}\n`);
        });
        callback();
    });

vorpal
    .command('search [query]')
    .option('-c', 'show only commands')
    .action(function (arg: {query: string, options: {c: boolean} }, callback) {
        const showOnlyCommand = arg.options && arg.options.c && (arg.options.c === true);
        if (arg.query) {
            let count = 0;
            allTips.forEach((tip) => {
                if (fuzzysearch(arg.query, tip.title)) {
                    this.log(yellow(tip.command));
                    if (!showOnlyCommand) {
                        this.log(`description: ${tip.title}`);
                        this.log(`command: ${tip.tip}\n`);
                    }
                    count++;
                }
            });
            if(count > 0) {
                this.log(green(`found ${count} tips`));
            }
        }
        callback();
    })

vorpal
    .command('update', 'update git tips')
    .action(function (arg, callback) {
        this.log('updating git tips...');
        try {
            updateList();
        } catch (e) {
            this.log(red('cannot update git tips right now: '));
            this.log(e);
        } finally {
            this.log(green('git tips list updated'));
        }
        callback();
    });

vorpal
    .command('run [command]', 'run specific git tip')
    .autocomplete(allGitCommands)
    .action(function (arg, callback) {
        console.log(arg);
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

vorpal
    .delimiter('gtip$')
    .show();
