"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
exports.listCommand = function (vorpal, allTips) {
    return vorpal
        .command('list', 'List all git tips')
        .option('-c', 'Show only commands')
        .action(function (arg, callback) {
        var _this = this;
        allTips.forEach(function (tip) {
            _this.log(chalk_1.yellow(tip.command));
            _this.log("description: " + tip.title);
            _this.log("command: " + tip.tip + "\n");
        });
        callback();
    });
};
