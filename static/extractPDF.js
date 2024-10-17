/**
 * @param {string} url
 */
async function getPDFText(url) {
  url = url || window.location.href;

  // eslint-disable-next-line no-undef
  let doc = pdfjsLib.getDocument(url);
  doc = await doc.promise;

  /**
   * @type {any[]}
   */
  const strings = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    textContent.items.map((/** @type {{ str: any; }} */ item) => strings.push(item.str));
    console.log("Processing Page: " + i);
  }

  return strings.join(" ").replace(/[\W]+/g, " ");
}

// eslint-disable-next-line no-unused-vars
/**
 * @param {any} url
 * @param {string | URL | undefined} baseUrl
 */
async function extractPDF(url, baseUrl) {
  let pdfText = null;

  try {
    const res = await fetch(new URL("pdf/pdf.min.js", baseUrl).href);
    eval(await res.text());

    //pdfjsLib should now exist
    // eslint-disable-next-line no-undef
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdf/pdf.worker.min.js", baseUrl).href;

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

