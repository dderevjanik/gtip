"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Remove unnecessary letters from command
 * @example "All Head: or ex." -> "All Head or ex"
 * @param sentence - sentence that will be striped
 */
var removeUnnecessaryLetters = function (sentence) {
    return sentence.replace(/\.|\,|:/g, '');
};
/**
* Upper case first letter in string
* @example "myString" -> "MyString"
* @param sentence - in which uppercase first letter
*/
var upperCaseFirstLetter = function (sentence) { return (sentence.length > 0)
    ? sentence[0].toLocaleUpperCase() + sentence.slice(1)
    : sentence; };
/**
* Extract parameters from git tip's command, those parameters will be used
* as arguments to execute git tipt's command
* @example "git checkout -b <branch_name>" -> ["branch_name"]
* @param command - from which get parameters
*/
var getParamsFromCommand = function (command) {
    var regEx = /<(.*?)>/ig;
    var params = [];
    var match = regEx.exec(command);
    while (match !== null) {
        params.push(match[0]);
        match = regEx.exec(command);
    }
    return params;
};
/**
 * Will parse tips
 */
exports.parseTips = function (notParsedTips) {
    var tipsWithCommands = notParsedTips.map(function (tip) { return (__assign({ command: removeUnnecessaryLetters(tip.title).split(' ')
            .map(function (word) { return word
            ? upperCaseFirstLetter(word)
            : word; }).join(''), params: getParamsFromCommand(tip.tip) }, tip)); });
    return tipsWithCommands;
};
