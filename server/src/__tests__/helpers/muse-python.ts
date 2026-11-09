// The Windows launcher is `python`; `python3` there is only a Microsoft Store alias.
export const museTestPython = process.env.PYTHON ?? (process.platform === "win32" ? "python" : "python3");
