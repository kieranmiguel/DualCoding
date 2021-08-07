import * as vscode from 'vscode';
import { PageData, ServerData }  from '../globals';
import { from } from 'rxjs';
import { TokenManager } from '../TokenManager';

  

  





export class DatabaseWatcher{
  lwenabeled: any = false;
  dwenabeled: any = false;
  accessToken:string | undefined= '';

 

  constructor(context: vscode.ExtensionContext){
    this.localWatcher();
    this.databaseWatcher();
    
    TokenManager.setaState(false);
    TokenManager.setsState(false);
    
}

  localWatcher(){

  const arraySource = from(PageData.data);  //Need new array watcher
  arraySource.subscribe(async val =>{
    
    console.log('localwatcher Triggered');
    
    if(vscode.workspace.workspaceFolders !== undefined) {
      let f: string = vscode.workspace.workspaceFolders[0].uri.fsPath; 
    if(TokenManager.getToken() !== undefined){
      this.accessToken = TokenManager.getToken();
      this.lwenabeled = TokenManager.getsState();
  if(this.lwenabeled){
    var data2 = {"pageData": PageData.data};

    
		
		async function http( 
			request: RequestInfo,
      accessToken:string | undefined,
      address: string
		): Promise<any> {
      
		const response = await fetch(request, {
		  method: 'POST',
		  headers: {
		  'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`
		  },
		  body: JSON.stringify(data2),
      address: address
			  });
		const body = await response.json();
		return body;
		}
	
	  
		  const data = await http(
			`http://localhost:3002/page`,
        this.accessToken,
        f
		  );

		  console.dir(data.auser);
  }
}
    }
});
}

databaseWatcher(){


  //Listerning Watching ServerData for updates
  
    var array: string[] = [''];
    ServerData.data = array;
  
  const arraySource2 = from(ServerData.data);
  arraySource2.subscribe(async val =>{
  this.dwenabeled = TokenManager.getaState();
  if(this.dwenabeled){
    let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words2.txt'); 
    vscode.workspace.openTextDocument(uri).then((a: vscode.TextDocument) => {
      vscode.window.showTextDocument(a, 1, false).then(e => {
          e.edit(edit => {
            for(var i = 0; i < ServerData.data.length; i++){
              edit.replace(new vscode.Position(i, 0), ServerData.data[i]);
            }

          });
      
      });
  }, (error: any) => {
      console.error(error);
      debugger;
  });
}
  });
  }


}

