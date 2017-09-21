import * as fuzzysearch from 'fuzzysearch';
import { green, yellow } from 'chalk';
import { ParsedTip } from '../Types';

export const searchCommand = (vorpal: Vorpal, allTips: ParsedTip[]) =>
    vorpal
        .command('search [query]', 'Search for specific command')
        .option('-c', 'Show only commands')
        .action(function (arg: { query: string, options: { c: boolean } }, callback) {
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
                if (count > 0) {
                    this.log(green(`found ${count} tips`));
                }
            }
            callback();
        });
