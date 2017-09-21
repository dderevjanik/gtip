"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Update_1 = require("../Update");
var chalk_1 = require("chalk");
exports.updateCommand = function (vorpal, allTips) {
    return vorpal
        .command('update', 'Update git tips from git-tips repo')
        .action(function (_, callback) {
        this.log('updating git tips...');
        try {
            Update_1.updateList();
        }
        catch (e) {
            this.log(chalk_1.red('cannot update git tips right now: '));
            this.log(e);
        }
        finally {
            this.log(chalk_1.green('git tips list updated'));
        }
        callback();
    });
};
