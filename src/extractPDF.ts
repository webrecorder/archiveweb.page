async function getPDFText(url: string) {
  url = url || window.location.href;

  let doc = pdfjsLib.getDocument(url);
  doc = await doc.promise;

  const strings: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    textContent.items.map((item) => strings.push(item.str));
    console.log("Processing Page: " + i);
  }

  return strings.join(" ").replace(/[\W]+/g, " ");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function extractPDF(url: string, baseUrl: string) {
  let pdfText: string | null = null;

  try {
    const res = await fetch(new URL("pdf/pdf.min.js", baseUrl).href);
    eval(await res.text());

    //pdfjsLib should now exist
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdf/pdf.worker.min.js",
      baseUrl
    ).href;

    if (url || document.querySelector("embed[type='application/pdf']")) {
      pdfText = await getPDFText(url);
    } else {
      console.log("Not a pdf: " + window.location.href);
    }
  } catch (e) {
    console.log(e);
    pdfText = "";
  }

  return pdfText;
}
