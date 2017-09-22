import { get } from 'http';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { parseTips } from './Parser';
import { NotParsedTip } from './Types';

/**
 * Update git tip list
 * @see https://github.com/git-tips/tips
 */
export const updateList = () => {
    fetch('https://raw.githubusercontent.com/git-tips/tips/master/tips.json')
        .then((res) => res.text())
        .then((body) => {
            const tips: NotParsedTip[] = JSON.parse(body);
            const parsed = parseTips(tips);
            writeFileSync(__dirname + '/../tips.json', JSON.stringify(parsed, null, 4))
        });
};
