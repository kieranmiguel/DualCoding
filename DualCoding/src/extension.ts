// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PageData, ServerData } from './globals';
import { SidebarProvider } from "./components/SidebarProvider";
import { TextWatcher } from "./components/TextWatcher";
import { TextPanel } from './components/TextPanel';
import { TextWriter } from './components/TextWriter';
import { DatabaseWatcher } from './components/DatabaseWatcher';
import { authenticate } from './authenticate';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	
	
	
	const textwatcher = new TextWatcher(context);
//	var databasewatcher =  new DatabaseWatcher(context);
	
	

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"dualcoding-sidebar",
		sidebarProvider
	  )
	);
	
	
	let getData = vscode.commands.registerCommand('dualcoding.GetData', async () => {
		
		
	/*	console.log('Get Data');
		 const text = 1;

		async function http(
			request: RequestInfo,
		  ): Promise<any> {
			const response = await fetch(request, {
            });
			const body = await response.json();
			return body;
		  }

		  
			
			const data = await http(
				`http://localhost:3002/Users?id=${text}`,
				
			  );
			  console.dir(data.auser);
			  ServerData.data = data.auser[0].contentBody;
			  let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words2.txt'); 
			  const textWriter = new TextWriter(uri);
		*/	  
		});
			  
			
	

	
	context.subscriptions.push(getData);
	
	context.subscriptions.push(
	vscode.commands.registerCommand('dualcoding.Authenticate', () => {
		authenticate();
	})
	);
	
	

	let sendData = vscode.commands.registerCommand('dualcoding.SendData', async () => {
		// The code you place here will be executed every time your command is executed
		console.log('Send Data');
		 
		var data2 = {"pageData": PageData.data};
		

		async function http(
			request: RequestInfo,
		): Promise<any> {
		const response = await fetch(request, {
		  method: 'POST',
		  headers: {
			'content-type': 'application/json',
		  },
		  body: JSON.stringify(data2),
			  });
		const body = await response.json();
		return body;
		}
	
	  
		  const data = await http(
			"http://localhost:3002/Users",
		  );

		  console.dir(data.auser);
		
	});
	

	context.subscriptions.push(sendData);

	let updateData = vscode.commands.registerCommand('dualcoding.UpdateData', async () => {
		// The code you place here will be executed every time your command is executed
		console.log('Update Data');
		 
		var data2 = {"pageData": PageData.data};

		const text = 1;
		

		async function http(
			request: RequestInfo,
		): Promise<any> {
		const response = await fetch(request, {
		  method: 'PUT',
		  headers: {
			'content-type': 'application/json',
		  },
		  body: JSON.stringify(data2),
			  });
		const body = await response.json();
		return body;
		}
	
	  
		  const data = await http(
			`http://localhost:3002/Users?id=${text}`,
		  );

		  console.dir(data.auser);
		
	});
	

	context.subscriptions.push(updateData);
}
 



// this method is called when your extension is deactivated
export function deactivate() {}
