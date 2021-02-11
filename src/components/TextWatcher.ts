import * as vscode from 'vscode';

export class TextWatcher{
    constructor(){

            var array: string[] = ["testStringggg"];

            let testing = vscode.window.createOutputChannel("Testing");
            testing.appendLine("LIne");
            testing.show();
            vscode.workspace.onDidChangeTextDocument(changeEvent => {
              // testing.appendLine(`Did change: ${changeEvent.document.uri}`);


                for (const change of changeEvent.contentChanges) {
                    if(change.range.start.character.toString() !== "0"){
                     testing.appendLine(change.range.start.character.toString()); 
                     testing.appendLine(change.text);  
                     array[change.range.start.character, change.range.end.character] = change.text;
                     testing.appendLine(array.toString());
                    }
                 // 
                 // text replacement
                
                
                }
            });
}
}