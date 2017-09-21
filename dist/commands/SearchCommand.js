"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fuzzysearch = require("fuzzysearch");
var chalk_1 = require("chalk");
exports.searchCommand = function (vorpal, allTips) {
    return vorpal
        .command('search [query]', 'Search for specific command')
        .option('-c', 'Show only commands')
        .action(function (arg, callback) {
        var _this = this;
        var showOnlyCommand = arg.options && arg.options.c && (arg.options.c === true);
        if (arg.query) {
            var count_1 = 0;
            allTips.forEach(function (tip) {
                if (fuzzysearch(arg.query, tip.title)) {
                    _this.log(chalk_1.yellow(tip.command));
                    if (!showOnlyCommand) {
                        _this.log("description: " + tip.title);
                        _this.log("command: " + tip.tip + "\n");
                    }
                    count_1++;
                }
            });
            if (count_1 > 0) {
                this.log(chalk_1.green("found " + count_1 + " tips"));
            }
        }
        callback();
    });
};
