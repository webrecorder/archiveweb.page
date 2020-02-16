"use strict";

import FlexSearch from 'flexsearch';
//import Fuse from 'fuse.js';


// ===========================================================================
class FullTextFlex
{
  constructor(name) {
    this.name = name || "flex";

    this.flex = new FlexSearch({
      doc: {
        id: "page:id",
        field: ['page:url', 'page:date', 'page:title', 'page:text'],
      }
    });

    chrome.storage.local.get([name], (result) => {
      if (result[name]) {
        console.log(result[name]);
        this.flex.import(result[name]);
      }
    });
  }

  addPageText(pageInfo) {
    this.flex.add([{page: pageInfo}]);

    const exportIndex = {};
    exportIndex[this.name] = this.flex.export();
    chrome.storage.local.set(exportIndex);
  }
}


// ===========================================================================
class FullTextFuse
{
  constructor(pages, name) {
    this.name = name;
    this.fuse = new Fuse(pages, {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.3,
      location: 0,
      distance: 10000,
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      maxPatternLength: 60,
      minMatchCharLength: 5,
      id: 'id',
      keys: ['url', 'date', 'title', 'text']
    });
  }

  addPageText(pageInfo) {
    //pageInfo.text = text;
  }
}


// ===========================================================================
function parseTextFromDom(dom) {
  const accum = [];
  const metadata = {};

  parseText(dom.root, metadata, accum);

  return accum.join('\n');
}

function parseText(node, metadata, accum) {
  const SKIPPED_NODES = ["script", "style", "header", "footer", "banner-div"];
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

export { FullTextFuse, FullTextFlex, parseTextFromDom };

