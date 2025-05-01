import { runUserCode } from "./pyodideRunner.js";

export function initEditor() {
  const editor = CodeMirror(document.getElementById("editor"), {
    value: 'print("Hello, World!")',
    mode: "python",
    lineNumbers: true,
    matchBrackets: true,
    theme: "monokai",
    extraKeys: {
      "Ctrl-Space": "autocomplete",
    },
  });

  return editor;
}

export async function runEditorCode(editor) {
  const userCode = editor.getValue();

  try {
    const output = await runUserCode(userCode);
    return { code: userCode, output: output };
  } catch (err) {
    console.error(err);
    return { code: userCode, output: `Err: ${err.message}` };
  }
}
