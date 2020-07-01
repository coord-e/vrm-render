import { JSDOM } from "jsdom";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

class MockBlob {
  buffer: Buffer;
  type: string;

  constructor(array: ArrayBuffer[], options: { type: string }) {
    this.buffer = Buffer.concat(array.map((a) => Buffer.from(a)));
    this.type = options.type;
  }

  dataURI() {
    return "data:" + this.type + ";base64," + this.buffer.toString("base64");
  }
}

function mock() {
  const jsdom = new JSDOM("<!DOCTYPE html>", { resources: "usable" });

  const props = {
    document: jsdom.window.document,
    Blob: MockBlob,
    self: {
      URL: {
        createObjectURL: (blob: MockBlob) => blob.dataURI(),
        revokeObjectURL: (_: String) => {},
      },
    },
  };

  Object.assign(global, props);
}

export async function parseGLB(data: ArrayBuffer): Promise<GLTF> {
  mock();

  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(data, "", resolve, reject);
  });
}
