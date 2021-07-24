import * as _vscode from "vscode";

 declare global {
  const tsvscode: {
    getSharingState: () => boolean;
    setSharingState: (state: boolean) => void;
    getAcceptingState: () => boolean;
    setAcceptingState: (state: boolean) => void;
    
  };
}

