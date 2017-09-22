import * as VorpalInstance from 'vorpal';
import { readFileSync } from 'fs';
import { ParsedTip } from './Types';
// Commands
import { listCommand } from './commands/ListCommand';
import { runCommand } from './commands/RunCommand';
import { searchCommand } from './commands/SearchCommand';
import { updateCommand } from './commands/UpdateCommand';

const tipsJSON = readFileSync(__dirname + '/../tips.json', { encoding: 'utf-8' }).toString();
const allTips: ParsedTip[] = JSON.parse(tipsJSON);
const allGitCommands = allTips.map(tip => tip.command);
const allTitles = allTips.map(tip => tip.title);

const vorpal = VorpalInstance();

listCommand(vorpal, allTips);
runCommand(vorpal, allTips, allGitCommands);
searchCommand(vorpal, allTips);
updateCommand(vorpal, allTips);

vorpal
    .delimiter('gtip$')
    .show();
