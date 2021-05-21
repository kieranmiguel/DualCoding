import { AsyncLocalStorage } from 'async_hooks';
import * as vscode from 'vscode';
import { PageData }  from '../globals';
import { getContext, setContext } from 'svelte';

  

  



let testing = vscode.window.createOutputChannel("Testing");

testing.appendLine("Start of Test------");
testing.show();


export class TextWatcher{

  constructor(context: vscode.ExtensionContext){
    //loader 
    
    
    
    //Watcher
    this.textWatcher();


}


 textGrabber(uri:vscode.Uri) {
//Syncronus 
  var arraytg: string[] = [''];
  PageData.data = arraytg;


//Async
//figure out how to start/stop async functions. 

vscode.workspace.openTextDocument(uri).then((document) => {
    var i:number = document.lineCount;
      for(var a:number = 0; a < i; a++){      
        arraytg[a] = document.lineAt(a).text;          
    }
    PageData.data = arraytg;  
  });

}

textWatcher(){

 

  var string:string;
  var a = 0;   
  

  vscode.workspace.onDidChangeTextDocument(changeEvent => {  
  
    for (const change of changeEvent.contentChanges) {   
    //if fetch() sharing = true{ a = 0,...
        if(a === 0){
          let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt'); 
         this.textGrabber(uri);
         a = 1;
        }
        console.log(JSON.stringify(change));
      if(change.text.toString() !== "\\r\\n"){
        
        
        //Backspace Mutiple Lines
        
         if(change.range.start.line !== change.range.end.line && change.text.length === 0){
          console.log("BSCPC Mutiple Lines");
          let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt'); 
          this.textGrabber(uri);
          
         }
         //Paste
        else if(change.range.start.line !== change.range.end.line){
          console.log("Paste");
          let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt'); 
          this.textGrabber(uri);
        }

        /*
          var tokens:string[] = change.text.toString().split("\\r\\n");
          console.log(tokens.toString());
          for(var b = 0; a < (change.range.end.line - change.range.start.line); b++ ){
            if(PageData.data[change.range.start.line + b]){
             string = PageData.data[change.range.start.line + b];
             }
             else{ string = '';}
             string = string.substr(0, change.range.start.character) + tokens[b] + string.substr(change.range.end.character + change.text.length);
               
           PageData.data[change.range.start.line] = string;
           string = '';
           console.log("array: " + PageData.data.toString());
            }
           }
        */
                   
         // Singular Line
          else if(change.text.length !== 0){
          console.log("Singular Line");
            if(PageData.data[change.range.start.line]){
            string = PageData.data[change.range.start.line];
            }
            else{ string = '';}
            string = string.substr(0, change.range.start.character) + change.text + string.substr(change.range.end.character + change.text.length);
            string = string.split('\r\n').join('');
          PageData.data[change.range.start.line] = string;
          string = '';
          console.log("array: " + PageData.data.toString());
          }
        //Backspace Singular Line
          else if (change.range.start.line === change.range.end.line){
            console.log("Backspace Singular Line");
            if(PageData.data[change.range.start.line]){
              string = PageData.data[change.range.start.line];
              }
              else{ string = '';}
            
            string = string.substr(0, change.range.start.character) + string.substr(change.range.end.character);   
            PageData.data[change.range.start.line] = string;
            string = '';
            console.log("array: " + PageData.data.toString());
          }
          
          
          ;
          
          
          
          
      }
     // 
     // text replacement
    }
      
   });
}

    

}