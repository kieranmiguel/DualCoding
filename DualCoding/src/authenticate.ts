import * as vscode from 'vscode';
import * as polka from 'polka';
import { applyBindingAccessorsToNode } from 'knockout';


export const authenticate = () => {
    console.log("called");
    const app = polka();

    app.get(`/auth/:token`, async (req, res) => {
        const {token} = req.params;
        if(!token){
            res.end('<h1>Something Went Wrong</h1>');
            return;
        }
        console.log(token);
        res.end('Auth Was successful, you can close this now');
    });
    
    app.listen(54321), (err: Error) => {
        if(err){
            vscode.window.showErrorMessage(err.message);
        }
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`http://localhost:3002/auth/github`));
    };
    
};