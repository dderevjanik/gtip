import { ParsedTip } from '../Types';
import { updateList } from '../Update';
import { red, green } from 'chalk';

export const updateCommand = (vorpal: Vorpal, allTips: ParsedTip[]) =>
    vorpal
        .command('update', 'Update git tips from git-tips repo')
        .action(function (_, callback) {
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
