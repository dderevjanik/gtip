import { get } from 'http';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

/**
 * Update git tip list
 * @see https://github.com/git-tips/tips
 */
export const updateList = () => {
    fetch('https://raw.githubusercontent.com/git-tips/tips/master/tips.json')
        .then((res) => res.text())
        .then((body) => {
            const tips: { title: string, tip: string }[] = JSON.parse(body);
            const tipsWithCommands = tips.map(tip => ({
                command: tip.title.split(' ')
                    .map(word => word
                        ? (word[0].toUpperCase() + word.slice(1))
                        : word
                    ).join(''),
                ...tip
            }));
            writeFileSync('tips.json', JSON.stringify(tipsWithCommands))
        });
};
