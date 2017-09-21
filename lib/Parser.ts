import { NotParsedTip, ParsedTip } from './Types';

/**
 * Remove unnecessary letters from command
 * @example "All Head: or ex." -> "All Head or ex"
 * @param sentence - sentence that will be striped
 */
const removeUnnecessaryLetters = (sentence: string): string =>
    sentence.replace(/\.|\,|:/g, '');

/**
* Upper case first letter in string
* @example "myString" -> "MyString"
* @param sentence - in which uppercase first letter
*/
const upperCaseFirstLetter = (sentence: string): string => (sentence.length > 0)
    ? sentence[0].toLocaleUpperCase() + sentence.slice(1)
    : sentence;

/**
* Extract parameters from git tip's command, those parameters will be used
* as arguments to execute git tipt's command
* @example "git checkout -b <branch_name>" -> ["branch_name"]
* @param command - from which get parameters
*/
const getParamsFromCommand = (command: string): string[] => {
    const regEx = /<(.*?)>/ig;
    const params = [];

    let match = regEx.exec(command);
    while (match !== null) {
        params.push(match[0]);
        match = regEx.exec(command);
    }
    return params;
}

/**
 * Will parse tips
 */
export const parseTips = (notParsedTips: NotParsedTip[]): ParsedTip[] => {
    const tipsWithCommands = notParsedTips.map(tip => ({
        command: removeUnnecessaryLetters(tip.title).split(' ')
            .map(word => word
                ? upperCaseFirstLetter(word)
                : word
            ).join(''),
        params: getParamsFromCommand(tip.tip),
        alternative: [],
        ...tip
    }));
    return tipsWithCommands;
};
