(() => {
  const SRC_SET_SELECTOR = "img[srcset], img[data-srcset], img[data-src], " +  
"video[srcset], video[data-srcset], video[data-src], audio[srcset], audio[data-srcset], audio[data-src], " +
"picture > source[srcset], picture > source[data-srcset], picture > source[data-src], " +
"video > source[srcset], video > source[data-srcset], video > source[data-src], " +
"audio > source[srcset], audio > source[data-srcset], audio > source[data-src]";

  const SRCSET_REGEX = /\s*(\S*\s+[\d.]+[wx]),|(?:\s*,(?:\s+|(?=https?:)))/;

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
      console.log("init autofetch");

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
            console.log(e);
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
        attributeFilter: ["srcset"]
      });
    }

    processChangedNode(target) {
      switch (target.nodeType) {
      case Node.ATTRIBUTE_NODE:
        if (target.nodeName === "srcset") {
          this.extractSrcSetAttr(target.nodeValue);
        }
        break;

      case Node.TEXT_NODE:
        if (target.parentNode && target.parentNode.tagName === "STYLE") {
          this.extractStyleText(target.nodeValue);
        }
        break;

      case Node.ELEMENT_NODE:
        if (target.sheet) {
          this.extractStyleSheet(target.sheet);
        }
        this.extractSrcSrcSet(target);
        setTimeout(() => this.extractSrcSrcSetAll(target), 1000);
        break;
      }
    }

    observeChange(changes) {
      for (const change of changes) {
        this.processChangedNode(change.target);

        if (change.type === "childList") {
          for (const node of change.addedNodes) {
            this.processChangedNode(node);
          }
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
      if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
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
      let rules;
    
      try {
        rules = sheet.cssRules || sheet.rules;
      } catch (e) {
        console.log("Can't access stylesheet");
        return;
      }

      for (const rule of rules) {
        if (rule.type === CSSRule.MEDIA_RULE) {
          this.extractStyleText(rule.cssText);
        }
      }
    }

    extractStyleText(text) {
      const urlExtractor = (m, n1, n2, n3) => {
        this.queueUrl(n2);
        return n1 + n2 + n3;
      };

      text.replace(STYLE_REGEX, urlExtractor).replace(IMPORT_REGEX, urlExtractor);
    }
  }

  if (!self.__awp_autofetch__) {
    new AutoFetcher().init();
    self.__awp_autofetch__ = true;
  }

})();
