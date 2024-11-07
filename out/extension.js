"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
const TimelineViewProvider_1 = require("./modules/Timeline/application/TimelineViewProvider");
const commands_1 = require("./modules/Button/application/commands");
const Buttonrepository_1 = require("./modules/Button/repository/Buttonrepository");
const treeItem_1 = require("./modules/Button/domain/treeItem");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const timelineViewProvider = new TimelineViewProvider_1.TimelineViewProvider(context);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('timelineView', timelineViewProvider));
    vscode.commands.registerCommand('extension.showTimeline', () => {
        vscode.commands.executeCommand('workbench.view.extension.timelineContainer');
        if (timelineViewProvider.currentWebview) {
            timelineViewProvider.showTimeline(timelineViewProvider.currentWebview);
        }
    });
    const jsonFilePath = path.join(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '', 'script', 'tdd_log.json');
    // Observa el archivo JSON para detectar cambios
    fs.watch(jsonFilePath, (eventType, filename) => {
        if (eventType === 'change') {
            vscode.commands.executeCommand('workbench.view.extension.timelineContainer');
            if (timelineViewProvider.currentWebview) {
                timelineViewProvider.showTimeline(timelineViewProvider.currentWebview);
            }
        }
    });
    const terminalRepository = new Buttonrepository_1.TerminalRepository();
    const commandService = new commands_1.CommandService(terminalRepository);
    let runTestCommand = vscode.commands.registerCommand('TDD.runTest', async () => {
        await commandService.runTestCommand();
    });
    context.subscriptions.push(runTestCommand);
    const myView = vscode.window.createTreeView('myView', {
        treeDataProvider: {
            getTreeItem: (element) => element,
            getChildren: () => [
                new treeItem_1.MyTreeItem('Run Test', vscode.TreeItemCollapsibleState.None, { command: 'TDD.runTest', title: 'Run Test' }, '', new vscode.ThemeIcon('play', new vscode.ThemeColor('charts.green')), '')
            ]
        }
    });
    context.subscriptions.push(myView);
}
//# sourceMappingURL=extension.js.map