"use strict";

import { WARCWriterBase } from 'node-warc';

import { STATUS_CODES } from 'http';

import { Writable } from 'stream';


// ===========================================================================
class WARCWriter extends WARCWriterBase {
  constructor() {
    super();
    //this._warcOutStream = new BufferWritableStream();
    this._warcOutStream = new VirtFSWritableStream();
    this.opts = {"gzip": true, "appending": false}

    let now = new Date().toISOString()
    this._now = now.substr(0, now.indexOf('.')) + 'Z'
  }

  getLength() {
    return this._warcOutStream.getLength();
  }

  processRequestResponse(url, reqresp, pending, payload) {
    const responseHeaders = responseHeadersToText(reqresp, pending);

    if (!payload) {
      payload = Buffer.from([]);
    }

    if (reqresp.method && reqresp._getReqHeaderObj()) {
      this.writeRequestResponseRecords(
        url, 
        {
          headers: reqresp.serializeRequestHeaders(),
          data: reqresp.postData
        },

        {
          headers: responseHeaders,
          data: payload
        }
      );
    } else {
      this.writeResponseRecord(
        url,
        responseHeaders,
        payload
      ); 
    }
  }
}

// ===========================================================================
// Writable to browser virtual filesystem via webkitRequestFileSystem()
class VirtFSWritableStream extends Writable {
  constructor() {
    super();
    this.chunks = [];

    this.writer = window.virtualWriter;

    this.writer.addEventListener("writeend", () => {
      this._writeNext();
    });

    this.writer.addEventListener("error", (err) => {
      console.warn("Wrtier Err: " + err);
    });
  }

  getLength() {
    return this.writer.length;
  }

  write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this._writeNext();
    return true;
  }

  _writeNext() {
    if (this.writer.readyState === this.writer.WRITING) {
      return;
    }

    if (!this.chunks.length) {
      this.emit('drain');
      return;
    }

    const chunk = this.chunks.shift();

    const res = this.writer.write(new Blob([chunk], {type: "application/octet-stream"}));

    this.emit('drain');
  }

  end(chunk, encoding, callback) {
    this.write(chunk, encoding, callback);
    this.emit('finish');
    return this;
  }
}

// ===========================================================================
// Writable to in memory buffer
class BufferWritableStream extends Writable {
  constructor() {
    super();
    this.length = 0;
  }

  write(chunk, encoding, callback) {
    const res = super.write(chunk, encoding, callback);

    this.length += chunk.length;

    if (!res) {
      this.emit('drain');
    }

    return res;
  }

  _write(chunk, encoding, callback) {
    return this.write(chunk, encoding, callback);
  }

  end(chunk, encoding, callback) {
    const res = super.end(chunk, encoding, callback);
    this.emit('finish');
    return res;
  }

  toBuffer() {
    let buffers = [];

    for (let buffer of this._writableState.buffer) {
      buffers.push(buffer.chunk);
    }
  
    return Buffer.concat(buffers);
  }
}

// ===========================================================================
function responseHeadersToText(reqresp, pending) {
  if (pending) {
    if (pending.responseHeadersText) {
      // condense any headers containing newlines
      return pending.responseHeadersText.replace(/(\n[^:\n]+)+(?=\r\n)/g, function(value) { return value.replace(/\r?\n/g, ", ")});
    }
    if (pending.responseHeaders) {
      reqresp.responseHeaders = pending.responseHeaders;
      return reqresp.serializeResponseHeaders();
    }
  }

  if (reqresp.responseHeaders) {
    return reqresp.serializeResponseHeaders();
  }

  const statusMsg = STATUS_CODES[reqresp.status];

  let headers = `HTTP/1.1 ${reqresp.status} ${statusMsg}\r\n`;

  for (let header of reqresp.responseHeadersList) {
     headers += `${header.name}: ${header.value.replace('\n', ', ')}\r\n`;
  }
  headers += `\r\n`;
  return headers;
}



export { WARCWriter };
