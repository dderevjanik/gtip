import { get } from 'http';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

const removeUnnecessaryLetters = (sentence: string) => 
    sentence.replace(/\.|\,|:/g, '');

/**
 * Upper case first letter in string
 * @param sentence - in which uppercase first letter
 * @example "myString" -> "MyString"
 */
const upperCaseFirstLetter = (sentence: string) => (sentence.length > 0)
    ? sentence[0].toLocaleUpperCase() + sentence.slice(1)
    : sentence;

/**
 * Extract parameters from git tip's command, those parameters will be used
 * as arguments to execute git tipt's command
 * @param command - from which get parameters
 * @example "git checkout -b <branch_name>" -> ["branch_name"]
 */
const getParamsFromCommand = (command: string): string[] => {
    const regEx = /<(.*?)>/ig;
    const params = [];
    
    let match = regEx.exec(command);
    while(match !== null) {
        params.push(match[0]);
        match = regEx.exec(command);
    }
    return params;
}


/**
 * Update git tip list
 * @see https://github.com/git-tips/tips
 */
export const updateList = () => {
    fetch('https://raw.githubusercontent.com/git-tips/tips/master/tips.json')
        .then((res) => res.text())
        .then((body) => {
            const tips: { title: string, tip: string, alternatives: string }[] = JSON.parse(body);
            const tipsWithCommands = tips.map(tip => ({
                command: removeUnnecessaryLetters(tip.title).split(' ')
                    .map(word => word
                        ? upperCaseFirstLetter(word)
                        : word
                    ).join(''),
                params: getParamsFromCommand(tip.tip),
                ...tip
            }));
            writeFileSync('tips.json', JSON.stringify(tipsWithCommands, null, 4))
        });
};
