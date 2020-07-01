import yargs from "yargs";

import { loadVRM } from "./load";
import { render } from "./render";
import { save } from "./save";

interface CLIOption {
  width: number;
  height: number;
  input: string;
  output: string;
}

function options(): CLIOption {
  return yargs
    .options({
      width: {
        alias: "w",
        type: "number",
        default: 800,
        description: "rendering resolution (width)",
      },
      height: {
        alias: "h",
        type: "number",
        default: 800,
        description: "rendering resolution (height)",
      },
      input: {
        alias: "i",
        type: "string",
        demandOption: true,
        description: "input vrm path",
      },
      output: {
        alias: "o",
        type: "string",
        demandOption: true,
        description: "output image path",
      },
    })
    .help().argv;
}

export async function main() {
  const opts = options();

  try {
    const vrm = await loadVRM(opts.input);
    const bitmap = await render(vrm, opts);
    await save(bitmap, opts);
  } catch (e) {
    console.error(e);
  }
}
