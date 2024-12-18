// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register a color provider for CSS files
	const provider = vscode.languages.registerColorProvider({ language: 'css' }, {
		provideDocumentColors(document: vscode.TextDocument): vscode.ColorInformation[] {
			const text = document.getText();
			const regex = /(--\w[\w-]*:\s*)(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3});/g
			const colors: vscode.ColorInformation[] = [];

			let match;
			while ((match = regex.exec(text))) {
				const [fullString, name, red, green, blue] = match;
				const start = document.positionAt(match.index + name.length);
				const end = document.positionAt(match.index + fullString.length);
				const range = new vscode.Range(start, end);

				const color = new vscode.Color(
					parseInt(red, 10) / 255,
					parseInt(green, 10) / 255,
					parseInt(blue, 10) / 255,
					1 // Alpha (opacity)
				);

				colors.push(new vscode.ColorInformation(range, color));
			}

			return colors;
		},

		provideColorPresentations(color: vscode.Color, context: { range: vscode.Range }): vscode.ColorPresentation[] {
			// Convert the color back to a CSS variable format
			const red = Math.round(color.red * 255);
			const green = Math.round(color.green * 255);
			const blue = Math.round(color.blue * 255);

			const presentation = new vscode.ColorPresentation(`${red}, ${green}, ${blue};`);
			return [presentation];
		},
	});

	context.subscriptions.push(provider);

}

// This method is called when your extension is deactivated
export function deactivate() { }
