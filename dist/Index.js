"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VorpalInstance = require("vorpal");
var fs_1 = require("fs");
// Commands
var ListCommand_1 = require("./commands/ListCommand");
var RunCommand_1 = require("./commands/RunCommand");
var SearchCommand_1 = require("./commands/SearchCommand");
var UpdateCommand_1 = require("./commands/UpdateCommand");
var tipsJSON = fs_1.readFileSync(__dirname + '/../tips.json', { encoding: 'utf-8' }).toString();
var allTips = JSON.parse(tipsJSON);
var allGitCommands = allTips.map(function (tip) { return tip.command; });
var allTitles = allTips.map(function (tip) { return tip.title; });
var vorpal = VorpalInstance();
ListCommand_1.listCommand(vorpal, allTips);
RunCommand_1.runCommand(vorpal, allTips, allGitCommands);
SearchCommand_1.searchCommand(vorpal, allTips);
UpdateCommand_1.updateCommand(vorpal, allTips);
vorpal
    .delimiter('gtip$')
    .show();
