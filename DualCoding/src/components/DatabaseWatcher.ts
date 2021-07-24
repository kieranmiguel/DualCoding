import * as vscode from 'vscode';
import { PageData, ServerData }  from '../globals';
import { from } from 'rxjs';
  

  





export class DatabaseWatcher{
  lwenabeled: boolean = tsvscode.getSharingState();
  dwenabeled: boolean = tsvscode.getAcceptingState();
  
 

  constructor(context: vscode.ExtensionContext){
    this.localWatcher();
    this.databaseWatcher();
    
}

  localWatcher(){

  const arraySource = from(PageData.data);
  arraySource.subscribe(async val =>{
    this.lwenabeled = tsvscode.getSharingState();
  if(this.lwenabeled){
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
  }
});
}

databaseWatcher(){


  //Listerning Watching ServerData for updates
  
    var array: string[] = [''];
    ServerData.data = array;
  
  const arraySource2 = from(ServerData.data);
  arraySource2.subscribe(async val =>{
  this.dwenabeled = tsvscode.getAcceptingState();
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

