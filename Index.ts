import * as Vorpal from 'vorpal';
import { updateList } from './Update';
import { readFileSync } from 'fs';
import { yellow, green, red } from 'chalk';

const tipsJSON = readFileSync('./tips.json', { encoding: 'utf-8' }).toString();
const allTips: { title: string, tip: string, command: string }[] = JSON.parse(tipsJSON);
const allGitCommands = allTips.map(tip => tip.command);

const vorpal = Vorpal();

vorpal
    .command('list', 'list all git tips')
    .action(function (arg, callback) {
        allTips.forEach(tip => {
            console.log(tip.title);
            console.log('Command: ' + yellow(tip.command));
            console.log(tip.tip + '\n');
        })
        callback();
    });

vorpal
    .command('search [query]')
    .action(function (arg, callback) {
        console.log(arg);
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
    .command('run', 'run specific git tip')
    .autocomplete(allGitCommands)
    .action(function (arg, callback) {
        console.log(arg);
        callback();
    });

vorpal
    .delimiter('gtip$')
    .show();


