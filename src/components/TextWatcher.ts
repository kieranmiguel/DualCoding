import * as vscode from 'vscode';
import { resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';

export class TextWatcher{

textGrabber(uri:vscode.Uri) {
  var array: string[] = [''];

  vscode.workspace.openTextDocument(uri).then((document) => {
    var i:number = document.lineCount;
      for(var a:number = 0; a < i; a++){
        
        array[a] = document.lineAt(a).text;

    }
    
  });
    
  return array;
}

textWatcher(array:string[]){

  let testing = vscode.window.createOutputChannel("Testing");

  testing.appendLine("Start of Test------");
  testing.show();

  var string:string;

  vscode.workspace.onDidChangeTextDocument(changeEvent => {
                 
              
    for (const change of changeEvent.contentChanges) {   
      if(change.range.end.character - change.range.start.character + 1 === change.text.length || change.text.length === 0){
         testing.appendLine("start line:");
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
         testing.appendLine("Array:");
         //Multiple Lines
         if(change.range.start.line !== change.range.end.line && change.text.length === 0){
              
              }
          
         // Singular Line
          if(change.text.length !== 0){
            if(array[change.range.start.line]){
            string = array[change.range.start.line];
            }
            else{ string = '';}
            string = string.substr(0, change.range.start.character) + change.text + string.substr(change.range.end.character + change.text.length);
              
          array[change.range.start.line] = string;
          string = '';
          }

          else{
            testing.appendLine("BcSPC");
            if(array[change.range.start.line]){
              string = array[change.range.start.line];
              }
              else{ string = '';}
            
            string = string.substr(0, change.range.start.character) + string.substr(change.range.end.character);   
            array[change.range.start.line] = string;
            string = '';
          }
          testing.appendLine(array.toString());
          
          }
     // 
     // text replacement
        }
      }
    
    
    );
}

    constructor(){

            

            //loader 
            let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt');
            var array:string[] = [''];
            array = this.textGrabber(uri);
            //Watcher
            this.textWatcher(array);

        
}

}