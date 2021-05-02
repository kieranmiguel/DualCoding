// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PageData } from './globals';
import { SidebarProvider } from "./components/SidebarProvider";
import { TextWatcher } from "./components/TextWatcher";
import { TextPanel } from './components/TextPanel';
import { TextWriter } from './components/TextWriter';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	
	const textwatcher = new TextWatcher();

	const textWriter = new TextWriter();
	

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
	let disposable = vscode.commands.registerCommand('dualcoding.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		 async function http(
			request: RequestInfo,
			id: number
		  ): Promise<any> {
			const response = await fetch(request);
			const body = await response.json();
			return body;
		  }
	  
		  const data = await http(
			"http://localhost:3002/Users",
			12
		  );

		  console.dir(data.auser[0].id);

		  /*async function http(
    request: RequestInfo,
    ): Promise<any> {

    const response = await fetch(request, {
      method: 'POST',
      body: JSON.stringify({pageData: "woh"})
          });
    const body = await response.json();
    return body;
    }
*/
		  

		  
			
		  

			var obj = {
				id: "name",
				bodyContent: ["one", "two"]
			};


			

			vscode.window.showInformationMessage("blah" + obj.id);
	
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
