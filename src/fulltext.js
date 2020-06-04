"use strict";


// ===========================================================================
function parseTextFromDom(dom) {
  const accum = [];
  const metadata = {};

  parseText(dom.root, metadata, accum);

  return accum.join('\n');
}


// ===========================================================================
function parseText(node, metadata, accum) {
  const SKIPPED_NODES = ["script", "style", "header", "footer", "banner-div", "noscript"];
  const EMPTY_LIST = [];
  const TEXT = "#text";
  const TITLE = "title";
  
  const name = node.nodeName.toLowerCase();
    
  if (SKIPPED_NODES.includes(name)) {
    return;
  }

  const children = node.children || EMPTY_LIST;

  if (name === TEXT) {
    const value = node.nodeValue ? node.nodeValue.trim() : '';
    if (value) {
      accum.push(value);
    }
  } else if (name === TITLE) {
    const title = [];

    for (let child of children) {
      parseText(child, null, title);
    }
  
    if (metadata) {
      metadata.title = title.join(' ');
    } else {
      accum.push(title.join(' '));
    }
  } else {
    for (let child of children) {
      parseText(child, metadata, accum);
    }

    if (node.contentDocument) { 
      parseText(node.contentDocument, null, accum);
    } 
  }
}

export { parseTextFromDom };

