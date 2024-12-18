
import * as vscode from "vscode"

const decorationType = vscode.window.createTextEditorDecorationType({});

export function applyColorDecorator(editor: vscode.TextEditor) {
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