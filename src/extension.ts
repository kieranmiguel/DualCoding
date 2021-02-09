// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from "./SidebarProvider";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	let testing = vscode.window.createOutputChannel("Testing");
	testing.appendLine("LIne");
	testing.show();
	vscode.workspace.onDidChangeTextDocument(changeEvent => {
        testing.appendLine(`Did change: ${changeEvent.document.uri}`);

        for (const change of changeEvent.contentChanges) {
             testing.appendLine(change.range.toString()); // range of text being replaced
             testing.appendLine(change.text); // text replacement
        }
   });


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

		// Display a message box to the user
		vscode.window.showInformationMessage('mellow!');
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
