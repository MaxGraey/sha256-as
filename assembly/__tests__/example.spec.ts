import { hash } from '..';

// Stolen from wasm-crypto
function toHexString(bin: Uint8Array): string {
  let bin_len = bin.length;
  let hex = "";
  for (let i = 0; i < bin_len; i++) {
    let bin_i = bin[i] as u32;
    let c = bin_i & 0xf;
    let b = bin_i >> 4;
    let x: u32 = ((87 + c + (((c - 10) >> 8) & ~38)) << 8) |
        (87 + b + (((b - 10) >> 8) & ~38));
    hex += String.fromCharCode(x as u8);
    x >>= 8;
    hex += String.fromCharCode(x as u8);
  }
  return hex;
}

describe("example", () => {
  it("Hash: empty array", () => {
    let preImgArrayBuffer = new Uint8Array(0);
    expect<string>(toHexString(hash(preImgArrayBuffer))).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });

  it("Hash: abc", () => {
    let preImgString = "abc";
    let preImgArrayBuffer = Uint8Array.wrap(String.UTF8.encode(preImgString));
    expect<string>(toHexString(hash(preImgArrayBuffer))).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });

  it("Hash: lorem ipsum", () => {
    let preImgString = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    let preImgArrayBuffer = Uint8Array.wrap(String.UTF8.encode(preImgString));
    expect<string>(toHexString(hash(preImgArrayBuffer))).toBe("7321348c8894678447b54c888fdbc4e4b825bf4d1eb0cfb27874286a23ea9fd2");
  });
});
