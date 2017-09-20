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
var fs_1 = require("fs");
var node_fetch_1 = require("node-fetch");
var removeUnnecessaryLetters = function (sentence) {
    return sentence.replace(/\.|\,|:/g, '');
};
/**
 * Upper case first letter in string
 * @param sentence - in which uppercase first letter
 * @example "myString" -> "MyString"
 */
var upperCaseFirstLetter = function (sentence) { return (sentence.length > 0)
    ? sentence[0].toLocaleUpperCase() + sentence.slice(1)
    : sentence; };
/**
 * Extract parameters from git tip's command, those parameters will be used
 * as arguments to execute git tipt's command
 * @param command - from which get parameters
 * @example "git checkout -b <branch_name>" -> ["branch_name"]
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
 * Update git tip list
 * @see https://github.com/git-tips/tips
 */
exports.updateList = function () {
    node_fetch_1.default('https://raw.githubusercontent.com/git-tips/tips/master/tips.json')
        .then(function (res) { return res.text(); })
        .then(function (body) {
        var tips = JSON.parse(body);
        var tipsWithCommands = tips.map(function (tip) { return (__assign({ command: removeUnnecessaryLetters(tip.title).split(' ')
                .map(function (word) { return word
                ? upperCaseFirstLetter(word)
                : word; }).join(''), params: getParamsFromCommand(tip.tip) }, tip)); });
        fs_1.writeFileSync('tips.json', JSON.stringify(tipsWithCommands, null, 4));
    });
};
