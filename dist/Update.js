"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var node_fetch_1 = require("node-fetch");
var Parser_1 = require("./Parser");
/**
 * Update git tip list
 * @see https://github.com/git-tips/tips
 */
exports.updateList = function () {
    node_fetch_1.default('https://raw.githubusercontent.com/git-tips/tips/master/tips.json')
        .then(function (res) { return res.text(); })
        .then(function (body) {
        var tips = JSON.parse(body);
        var parsed = Parser_1.parseTips(tips);
        fs_1.writeFileSync('tips.json', JSON.stringify(parsed, null, 4));
    });
};
