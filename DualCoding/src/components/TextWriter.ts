import * as vscode from 'vscode';
import {ServerData} from '../globals'
export class TextWriter{

    constructor(){
      //loader 
     
      ServerData.data = ['abc', 'def', 'ghi']
      let uri = vscode.Uri.file('/Users/Idot/Documents/DualCoding-Example/words.txt');
      
      
      //Watcher
      
  
  
  }