// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { applyColorDecorator } from './test/applyColorDecorator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const validFormats = ["css", "scss"];

	vscode.workspace.onDidOpenTextDocument(_ => {
		const editor = vscode.window.activeTextEditor;
		if (editor && validFormats.includes(editor.document.languageId)) {
			applyColorDecorator(editor);
		}
	});

	vscode.workspace.onDidChangeTextDocument(_ => {
		const editor = vscode.window.activeTextEditor;
		if (editor && validFormats.includes(editor.document.languageId)) {
			applyColorDecorator(editor);
		}
	});

}

// This method is called when your extension is deactivated
export function deactivate() { }
