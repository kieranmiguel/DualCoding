import { AsyncLocalStorage } from 'async_hooks';
import * as vscode from 'vscode';
import { PageData }  from '../globals';




let testing = vscode.window.createOutputChannel("Testing");

testing.appendLine("Start of Test------");
testing.show();
export class TextWatcher{

  constructor(){
    //loader 
   
    
    let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt');
    
    
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
    testing.appendLine("pulling from save");
    testing.appendLine(PageData.data.toString());
    
    
  });
  

  
  

}

textWatcher(){

 

  var string:string;

  vscode.workspace.onDidChangeTextDocument(changeEvent => {     
    for (const change of changeEvent.contentChanges) {   
      if(change.range.end.character - change.range.start.character + 1 === change.text.length || change.text.length === 0){
        /* testing.appendLine("start line:");
         testing.appendLine(change.range.start.line.toString());
         testing.appendLine("end line");
         testing.appendLine(change.range.end.line.toString());
         testing.appendLine("Start Char:");
         testing.appendLine(change.range.start.character.toString()); 
         testing.appendLine("End Char:");
         testing.appendLine(change.range.end.character.toString()); 
         testing.appendLine("length:");
         testing.appendLine(change.text.length.toString());
         testing.appendLine("text:");
         testing.appendLine(change.text);  
         */
         testing.appendLine("Array:"); 
         //Multiple Lines
         

        //BCSPC
         if(change.range.start.line !== change.range.end.line && change.text.length === 0){
          let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt'); 
            
          this.textGrabber(uri);
           
               
          
              }
          
         // Singular Line
          else if(change.text.length !== 0){
            if(PageData.data[change.range.start.line]){
            string = PageData.data[change.range.start.line];
            }
            else{ string = '';}
            string = string.substr(0, change.range.start.character) + change.text + string.substr(change.range.end.character + change.text.length);
              
          PageData.data[change.range.start.line] = string;
          string = '';
          }

          else if (change.range.start.line === change.range.end.line){
            testing.appendLine("BcSPC");
            if(PageData.data[change.range.start.line]){
              string = PageData.data[change.range.start.line];
              }
              else{ string = '';}
            
            string = string.substr(0, change.range.start.character) + string.substr(change.range.end.character);   
            PageData.data[change.range.start.line] = string;
            string = '';
          }
          testing.appendLine(PageData.data.toString());
          
          
          
          
          }
     // 
     // text replacement
        }
      }
    
    
    );
}

    

}