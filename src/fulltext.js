"use strict";

import FlexSearch from 'flexsearch';
//import Fuse from 'fuse.js';

import { MAIN_DB_KEY } from './utils';


// ===========================================================================
class FullTextFlex
{
  constructor(name) {
    this.name = name || "flex";

    this._init();
    this._import();
  }

  _init() {
    this.flex = new FlexSearch({
      doc: {
        id: "page:id",
        field: ['page:url', 'page:date', 'page:title', 'page:text', 'page:size'],
      }
    });
  }

  search(query) {
    return this.flex.search(query);
  }

  addPageText(pageInfo) {
    this.flex.add([{page: pageInfo}]);
    this._export();
  }

  remove(id) {
    this.flex.remove({page: {id}});
    this._export();
  }

  _export() {
    const exportIndex = {};
    exportIndex[this.name] = this.flex.export();
    chrome.storage.local.set(exportIndex);
  }

  _import() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.name], (result) => {
        if (result[this.name]) {
          this.flex.import(result[this.name]);
        }
        resolve();
      });
    });
  }

  deleteAll() {
    this.flex.destroy();
    chrome.storage.local.remove(this.name);
    this._init();
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

const fulltext = new FullTextFlex(MAIN_DB_KEY);
self.fulltext = fulltext;

export { parseTextFromDom, fulltext };

