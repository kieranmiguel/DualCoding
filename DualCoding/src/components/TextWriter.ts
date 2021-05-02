import * as vscode from 'vscode';
import {ServerData} from '../globals';

var fs = require('fs');
export class TextWriter{

    constructor(){
      //loader 
     
      ServerData.data = ['abc', 'def', 'ghi'];
      let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt');

     /* fs.readFile(uri, "utf8", function(_err:any, data:any){
        console.log(data);
      });
      */
      vscode.workspace.openTextDocument(uri).then((a: vscode.TextDocument) => {
        vscode.window.showTextDocument(a, 1, false).then(e => {
            e.edit(edit => {
                edit.insert(new vscode.Position(0, 0), "Test");
            });
        });
    }, (error: any) => {
        console.error(error);
        debugger;
    });
      
      
      //Watcher
      
  
  
  }
}