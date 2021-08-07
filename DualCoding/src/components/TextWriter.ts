import * as vscode from 'vscode';
import {ServerData} from '../globals';

var fs = require('fs');
export class TextWriter{

    constructor(uri:vscode.Uri){
      //loader 
     
     if(ServerData.data.length === undefined){
       ServerData.data = [''];
     }
     this.textwriter(uri);
      
    }

textwriter(uri:vscode.Uri){
 
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

  sleep(seconds: number)
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }
      
  }


  
  
 