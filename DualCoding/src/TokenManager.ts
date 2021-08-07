import * as vscode from "vscode";

const KEY = "vstodotoken";
const KEY2 = "sharingState";
const KEY3 = "acceptingState";
export class TokenManager {
  static globalState: vscode.Memento;

  static setToken(token: string) {
    return this.globalState.update(KEY, token);
  }

  static getToken(): string | undefined {
    return this.globalState.get(KEY);
  }

 
  static setsState(token: boolean) {
    return this.globalState.update(KEY2, token);
  }

  static getsState(): any {
    return this.globalState.get(KEY2);
  }

  static setaState(token: boolean) {
    return this.globalState.update(KEY3, token);
  }

  static getaState(): any {
    return this.globalState.get(KEY3);
  }
}