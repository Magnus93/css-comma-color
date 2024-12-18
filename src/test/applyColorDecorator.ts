
import * as vscode from "vscode"

const decorationType = vscode.window.createTextEditorDecorationType({});

const activeEditor = vscode.window.activeTextEditor;

export const triggerColorPicker = vscode.commands.registerCommand("css-comma-color.triggerColorPicker", async (range: vscode.Range) => {
  console.log("triggerColorPicker command!!")
  if (!activeEditor) {
    console.log("Non valid editor!")
    return
  }

  const colorPlaceholder = "#ff0000"
  await activeEditor.edit(editBuilder => {
    editBuilder.replace(range, colorPlaceholder)
  })

  // Move the cursor to the color to trigger the built-in Color Picker
  activeEditor.selection = new vscode.Selection(range.start, range.end);
  vscode.commands.executeCommand('editor.action.triggerSuggest'); // Ensures the picker will show if required
})


export function applyColorDecorator(editor: vscode.TextEditor) {
  // const text = editor.document.getText();
  // const colorMatches = [...text.matchAll(/(--\w[\w-]*:\s*)(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3});/g)];
  // const decorations: vscode.DecorationOptions[] = [];

  // colorMatches.forEach(match => {
  //   const [fullString, name, red, green, blue] = match;
  //   const start = editor.document.positionAt((match.index || 0) + name.length);
  //   const end = editor.document.positionAt((match.index || 0) + name.length);
  //   const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  //   const lightness = ((+red) + (+green) + (+blue)) / 3;
  //   const borderColor = lightness < 100 ? "white" : "black";
  //   const range = new vscode.Range(start, end)
  //   const hoverMessage = new vscode.MarkdownString(`My hover message here: [Pick a color](command:css-comma-color.triggerColorPicker?${encodeURIComponent(JSON.stringify(range))})`)
  //   hoverMessage.isTrusted = true; // Allow clickable links

  //   decorations.push({
  //     range,
  //     hoverMessage,
  //     renderOptions: {
  //       before: {
  //         contentText: ' ',
  //         border: `1px solid ${borderColor}`,
  //         backgroundColor: rgbColor,
  //         color: rgbColor,
  //         margin: '0 4px 0 0',
  //         width: '16px',
  //         height: '16px'
  //       }
  //     }
  //   });
  // });
  // console.log("Applying decorations to", decorations.length)
  // editor.setDecorations(decorationType, decorations);
}