import * as vscode from 'vscode';
import * as polka from 'polka';
import { applyBindingAccessorsToNode } from 'knockout';
import { TokenManager } from './TokenManager';


export const authenticate = (fn: () => void) => {
    

    
    console.log("called");
    const app = polka();

    app.get(`/auth/:token`, async (req, res) => {
        const {token} = req.params;
        if(!token){
            res.end('<h1>Something Went Wrong</h1>');
            return;
        }
        await TokenManager.setToken(token);
        res.end('Auth Was successful, you can close this now');

        (app as any).server.close();
        fn();
       });
    

    app.listen(54321, (err: Error) => {
        if(err){
            vscode.window.showErrorMessage(err.message);
        } else{
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse("http://localhost:3002/auth/github"));
        }
    });
    
    
};