// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PageData } from './globals';
import { SidebarProvider } from "./components/SidebarProvider";
import { TextWatcher } from "./components/TextWatcher";
import { TextPanel } from './components/TextPanel';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	
	const textwatcher = new TextWatcher();
	

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"dualcoding-sidebar",
		sidebarProvider
	  )
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dualcoding.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		TextPanel.createOrShow(context.extensionUri);
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
