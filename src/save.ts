import { PNG } from "pngjs";

import * as fs from "fs";
import * as stream from "stream";

interface SaveOption {
  width: number;
  height: number;
  output: string;
}

export async function save(
  bitmap: Uint8Array,
  opts: SaveOption
): Promise<void> {
  const { width, height, output } = opts;

  const png = new PNG({ width, height });
  png.data = bitmap as Buffer;

  return await new Promise((resolve, reject) => {
    stream.finished(png.pack().pipe(fs.createWriteStream(output)), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
