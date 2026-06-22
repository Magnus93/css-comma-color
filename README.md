# CSS Variable Color Preview and Edit

This VSCode extension provides a **live color preview** for CSS variables that represent RGB values in your stylesheet. It automatically displays the preview of colors defined with comma-separated **or** space-separated RGB values in your CSS files.

## Features

- **Color Preview and Edit for CSS Variables**: It detects and shows a color preview for CSS variables defined as RGB values, using either commas (`--my-color: 255, 0, 0;`) or spaces (`--my-color: 255 0 0;`).
- **Real-time Updates**: The color preview is automatically updated as you modify the CSS variable's RGB values.
- **Intuitive & Simple**: The extension makes it easy to visualize your CSS colors directly in the editor without the need to open external tools or check the browser.

## Supported Syntax

The extension supports CSS variables in either of the following formats:

```css
--variable-name: r, g, b;
--variable-name: r g b;
```

![Color preview RGB comma separated css variables.](images/preview-color.png)
![Color edit RGB comma separated css variables.](images/edit-color.png)
![Color preview RGB space separated css variables.](images/preview-space-separated.png)

It will automatically show a color preview, that can be edited for each defined variable. When you edit a color through the picker, the original separator style (comma or space) is preserved.

## Installation

1. Open Visual Studio Code.
1. Go to the Extensions Marketplace (Ctrl+Shift+X or Cmd+Shift+X on macOS).
1. Search for CSS Variable Color Preview.
1. Click Install to add the extension to your VSCode.

## Requirements

vscode 1.95.0 or greater.
