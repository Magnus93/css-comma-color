// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "css-comma-color" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('css-comma-color.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from css-comma-color!');
	});

	const decorationType = vscode.window.createTextEditorDecorationType({});
	const validFormats = ["css", "scss"];

	function applyColorDecorator(editor: vscode.TextEditor) {
		const text = editor.document.getText();
		const colorMatches = [...text.matchAll(/(--\w[\w-]*:\s*)(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3});/g)];
		const decorations: vscode.DecorationOptions[] = [];

		colorMatches.forEach(match => {
			const [fullString, name, red, green, blue] = match;
			const start = editor.document.positionAt((match.index || 0) + name.length);
			const end = editor.document.positionAt((match.index || 0) + fullString.length);
			const rgbColor = `rgb(${red}, ${green}, ${blue})`;
			const lightness = ((+red) + (+green) + (+blue)) / 3;
			const borderColor = lightness < 100 ? "white" : "black";

			decorations.push({
				range: new vscode.Range(start, end),
				renderOptions: {
					before: {
						contentText: ' ',
						border: `1px solid ${borderColor}`,
						backgroundColor: rgbColor,
						margin: '0 4px 0 0',
						width: '16px',
						height: '16px'
					}
				}
			});
		});
		editor.setDecorations(decorationType, decorations);
	}

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

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
