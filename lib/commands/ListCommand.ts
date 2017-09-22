import { ParsedTip } from '../Types';
import { yellow } from 'chalk';

export const listCommand = (vorpal: Vorpal, allTips: ParsedTip[]) =>
    vorpal
        .command('list', 'List all git tips')
        .option('-c', 'Show only commands')
        .action(function (arg: { options: { c: boolean } }, callback) {
            const onlyCommand = arg.options && arg.options.c && (arg.options.c === true)
                ? true
                : false;
            allTips.forEach(tip => {
                this.log(yellow(tip.command));
                if (!onlyCommand) {
                    this.log(`description: ${tip.title}`);
                    this.log(`command: ${tip.tip}\n`);
                }
            });
            callback();
        });
