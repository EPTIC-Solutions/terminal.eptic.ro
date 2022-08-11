export type CommandName = string;
export type CommandHandler = () => boolean;

interface CommandHelp {
  [key: CommandName]: string;
}

let commands: Map<CommandName, CommandHandler> = new Map<
  CommandName,
  CommandHandler
>();
let helpCommands: CommandHelp[] = [];

const registerCommand = (
  commandName: string,
  handler: () => boolean,
  description: string | undefined = undefined
) => {
  Object.assign(commands, { [commandName]: handler });
  commands.set(commandName, handler);
  Object.assign(helpCommands, { [commandName]: description });
};

const loadCommands = () => {
  return new Promise<boolean>((resolve) => {
    const modules = import.meta.glob("./*");
    let length = Object.keys(modules).length;

    for (const path in modules) {
      modules[path]!().then((mod: any) => {
        length--;
        if (!mod.default) {
          console.error(
            "Module " + path + " does not export a default export."
          );
          return;
        }
        const formattedPath = path.replace(/^\.\//, "");
        const commandName = formattedPath.replace(/\.[^/.]+$/, "");
        registerCommand(
          commandName,
          mod.default as () => boolean,
          mod.description
        );
        if (!length) {
          resolve(true);
        }
      });
    }
  });
};

type Line = {
  line: string;
  classname?: string | Array<string>;
};

const lines: Line[] = [];

const writeLine = (
  line: string,
  classname: string | Array<string> | undefined = undefined
) => {
  lines.push({ line, classname });
  setTimeout(doWriteLine, 50 * lines.length);
};

const doWriteLine = () => {
  let lineObject;
  if ((lineObject = lines.shift())) {
    const newLine = document.createElement("p");
    newLine.innerHTML = lineObject.line;
    if (lineObject.classname) {
      if (Array.isArray(lineObject.classname)) {
        lineObject.classname.forEach((classname) => {
          newLine.classList.add(classname);
        });
      } else {
        newLine.classList.add(lineObject.classname);
      }
      newLine.classList.add();
    } else {
      newLine.classList.add("command");
    }
    window.$("#terminal").append(newLine);
    return;
  }
};

addEventListener("animationend", (event) => {
  if (event.animationName !== "typing") {
    return;
  }
  console.log(event);
  (event.target as HTMLParagraphElement).style.overflow = "overlay";
});

export { commands, helpCommands, loadCommands, writeLine };
