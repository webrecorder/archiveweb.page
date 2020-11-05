
const SRC_SET_SELECTOR = 'img[srcset], img[data-srcset], img[data-src], ' +  
'video[srcset], video[data-srcset], video[data-src], audio[srcset], audio[data-srcset], audio[data-src], ' +
'picture > source[srcset], picture > source[data-srcset], picture > source[data-src], ' +
'video > source[srcset], video > source[data-srcset], video > source[data-src], ' +
'audio > source[srcset], audio > source[data-srcset], audio > source[data-src]';

const SRCSET_REGEX = /\s*(\S*\s+[\d\.]+[wx]),|(?:\s*,(?:\s+|(?=https?:)))/;

const STYLE_REGEX = /(url\s*\(\s*[\\"']*)([^)'"]+)([\\"']*\s*\))/gi;
const IMPORT_REGEX = /(@import\s*[\\"']*)([^)'";]+)([\\"']*\s*;?)/gi;


// ===========================================================================
class AutoFetcher
{
  constructor() {
    this.urlSet = new Set();
    this.urlqueue = [];
    this.numPending = 0;
  }

  init() {
    window.addEventListener("load", () => {
      this.extractSrcSrcSetAll(document);
      this.extractStyleSheets();

      this.initObserver();
    });
  }

  isValidUrl(url) {
    return url && (url.startsWith("http:") || url.startsWith("https:"));
  }

  queueUrl(url) {
    try {
      url = new URL(url, document.baseURI).href;
    } catch (e) {
      return;
    }

    if (!this.isValidUrl(url)) {
      return;
    }

    if (this.urlSet.has(url)) {
      return;
    }

    this.urlSet.add(url);

    this.doFetch(url);
  }

  async doFetch(url) {
    this.urlqueue.push(url);
    if (this.numPending <= 6) {
      while (this.urlqueue.length > 0) {
        const url = this.urlqueue.shift();
        try {
          this.numPending++;
          console.log("AutoFetching: " + url);
          const resp = await fetch(url);
          await resp.blob();
        } catch (e) {

        }
        this.numPending--;
      }
    }
  }

  initObserver() {
    this.mutobz = new MutationObserver((changes) => this.observeChange(changes));

    this.mutobz.observe(document.documentElement, {
      characterData: false,
      characterDataOldValue: false,
      attributes: true,
      attributeOldValue: true,
      subtree: true,
      childList: true,
      attributeFilter: ['srcset']
    });
  }

  observeChange(changes) {
    for (const change of changes) {
      switch (change.type) {
        case "attributes":
          if (change.target.nodeValue) {
            this.extractSrcSetAttr(change.target.nodeValue);
          }
          break;

        case "childList":
          for (const elem of change.addedNodes) {
            if (elem.sheet) {
              this.extractStyleSheet(elem.sheet);
            }
            this.extractSrcSrcSet(elem);
            setTimeout(() => this.extractSrcSrcSetAll(elem), 1000);
          }
          break;
      }
    }
  }

  extractSrcSrcSetAll(root) {
    const elems = root.querySelectorAll(SRC_SET_SELECTOR);

    for (const elem of elems) {
      //console.log(elem);
      this.extractSrcSrcSet(elem);
    } 
  }

  extractSrcSrcSet(elem) {
    if (!elem) {
      console.warn("No elem to extract from");
      return;
    }

    const src = elem.src || elem.getAttribute("data-src");

    if (src) {
      this.queueUrl(src);
    }

    const srcset = elem.srcset || elem.getAttribute("data-srcset");

    if (srcset) {
      this.extractSrcSetAttr(srcset);
    }
  }

  extractSrcSetAttr(srcset) {
    for (const v of srcset.split(SRCSET_REGEX)) {
      if (v) {
        const parts = v.trim().split(" ");
        this.queueUrl(parts[0]);
      }
    }
  }

  extractStyleSheets(root) {
    root = root || document;

    for (const sheet of root.styleSheets) {
      this.extractStyleSheet(sheet);
    }
  }

  extractStyleSheet(sheet) {
    const urlExtractor = (m, n1, n2, n3) => {
      this.queueUrl(n2);
      return n1 + n2 + n3;
    };

    let rules;
    
    try {
      rules = sheet.cssRules || sheet.rules;
    } catch (e) {
      console.log("Can't access stylesheet");
      return;
    }

    for (const rule of rules) {
      if (rule.type === CSSRule.MEDIA_RULE) {
        rule.cssText
        .replace(STYLE_REGEX, urlExtractor)
        .replace(IMPORT_REGEX, urlExtractor);
      }
    }
  }
}

new AutoFetcher().init();
