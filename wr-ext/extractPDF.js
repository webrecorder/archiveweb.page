async function getPDFText(url) {
  url = url || window.location.href;

  //pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdf.worker.min.js");
  let doc = pdfjsLib.getDocument(url);
  doc = await doc.promise;

  const strings = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    textContent.items.map(item => strings.push(item.str));
    console.log("Processing Page: " + i);
  }

  return strings.join(" ").replace(/[\W]+/g, " ");
}

async function extractPDF(url) {
  let pdfText = null;

  try {
    if (url || document.querySelector("embed[type='application/pdf']")) {
      pdfText = await getPDFText(url);
    } else {
      console.log("Not a pdf: " + window.location.href);
    }
  } catch (e) {
    console.log(e);
    pdfText = "";
  }

  chrome.runtime.sendMessage({"msg": "pdfText", "text": pdfText});
  console.log("PDF Text Sent: " + pdfText.length);
}

