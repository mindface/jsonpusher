let wasm: typeof import('../../public/wasm/pdf_parser');

export const initPDFModule = async () => {
  if (!wasm) {
    wasm = await import('../../public/wasm/pdf_parser');
    await wasm.default(); // init wasm
  }
  return wasm;
};

export const parsePDF = async (pdfBytes: Uint8Array) => {
  const wasm = await initPDFModule();
  const result = wasm.parse_pdf(pdfBytes);
	console.log("result:", result);
  return {result};
}
