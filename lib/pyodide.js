let pyodide = null;
export async function loadPyodidePlugin() {
  pyodide = await loadPyodide();

  await pyodide.runPythonAsync(`
    import sys
    class StdoutCatcher:
        def __init__(self):
            self.data = ""
        def write(self, s):
            self.data += s
        def flush(self):
            pass
    
    sys.stdout = StdoutCatcher()
    sys.stderr = sys.stdout
    `);

  console.log("Pyodide loaded.");
}

export async function runUserCode(code) {
  if (!pyodide) throw new Error("Pyodide not yet loaded");

  try {
    await pyodide.runPythonAsync(code);

    // retrieve output from the stdout python object
    const output = await pyodide.runPythonAsync("sys.stdout.data");

    // clear the buffer so the next output doesn't contain leftovers
    await pyodide.runPythonAsync("sys.stdout.data = ''");
    return output;
  } catch (err) {
    return `Error: ${err}`;
  }
}
