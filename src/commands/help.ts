import { EPTIC } from "../globals";
import { type CommandHandler, writeLine, helpCommands } from "./init";

// const help = [
//   "<br>",
//   '<span class="command-text">whois</span>          Who is Forrest?',
//   '<span class="command-text">whoami</span>         Who are you?',
//   '<span class="command-text">video</span>          View YouTube videos',
//   '<span class="command-text">social</span>         Display social networks',
//   '<span class="command-text">secret</span>         Find the password',
//   '<span class="command-text">projects</span>       View coding projects',
//   '<span class="command-text">history</span>        View command history',
//   '<span class="command-text">help</span>           You obviously already know what this does',
//   '<span class="command-text">email</span>          Do not email me',
//   '<span class="command-text">clear</span>          Clear terminal',
//   '<span class="command-text">banner</span>         Display the header',
//   "<br>",
// ];

const helpHandler: CommandHandler = () => {
  writeLine("<br>");
  writeLine(`${EPTIC.name} ${EPTIC.version}`);
  writeLine("<br>");
  Object.entries(helpCommands)
    .sort()
    .forEach((command) => {
      const line = `<span class="command-text color2">${command[0]}</span>${
        command[1] ?? ""
      }`;
      writeLine(line, "help-command");
    });
  writeLine("<br>");
  return true;
};

export const description = "I guess you know what this does now.";

export default helpHandler;
