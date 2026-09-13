import logoSrc from "../../assets/eimcta-logo.png";
import watermarkSrc from "../../assets/watermark.png";

export async function loadLogo() {
  const res = await fetch(logoSrc);
  return new Uint8Array(await res.arrayBuffer());
}

export async function loadWatermark() {
  const res = await fetch(watermarkSrc);
  return new Uint8Array(await res.arrayBuffer());
}