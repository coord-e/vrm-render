import createContext from "gl";
import { JSDOM } from "jsdom";
import * as THREE from "three";
import { VRM, VRMSchema } from "@pixiv/three-vrm";

interface RenderOption {
  width: number;
  height: number;
}

function createCanvas() {
  if (global.document === undefined) {
    const { document } = new JSDOM().window;
    return document.createElement("canvas");
  } else {
    return document.createElement("canvas");
  }
}

export async function render(
  vrm: VRM,
  opts: RenderOption
): Promise<Uint8Array> {
  const { width, height } = opts;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30.0, width / height, 0.1, 20.0);
  camera.position.set(0.0, 1.0, 5.0);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1.0, 1.0, 1.0).normalize();
  scene.add(light);

  scene.add(vrm.scene);

  if (vrm.humanoid !== undefined) {
    const node = vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
    if (node !== null) {
      node.rotation.x = Math.PI;
    }
  }

  const gl = createContext(width, height, { preserveDrawingBuffer: true });

  const canvas = Object.assign(createCanvas(), { height, width });

  const renderer = new THREE.WebGLRenderer({
    canvas,
    context: gl,
    antialias: true,
  });
  renderer.render(scene, camera);

  const bitmap = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

  return bitmap;
}
