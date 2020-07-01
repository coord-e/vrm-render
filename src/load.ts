import { VRM, VRMUtils } from "@pixiv/three-vrm";

import * as fs from "fs";
import * as util from "util";

import { parseGLB } from "./gltf";

export async function loadVRM(path: string): Promise<VRM> {
  const data = await util.promisify(fs.readFile)(path);
  const gltf = await parseGLB(data.buffer);
  VRMUtils.removeUnnecessaryJoints(gltf.scene);
  const vrm = await VRM.from(gltf);
  return vrm;
}
