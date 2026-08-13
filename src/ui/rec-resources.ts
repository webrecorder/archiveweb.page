import { html, css } from "lit";
import {
    URLResources,
    wrapCss,
    clickOnSpacebarPress,
    getReplayLink,
    getDownloadLink,
    dateTimeFormatter,
} from "replaywebpage";

import fasSearch from "@fortawesome/fontawesome-free/svgs/solid/search.svg";
import fasDownload from "@fortawesome/fontawesome-free/svgs/solid/download.svg";

import { ifDefined } from "lit/directives/if-defined.js";

class RecUrlResources extends URLResources {
    static get sortKeys() {
        return [
            ...super.sortKeys,
            {
                key: "digest",
                name: "Digest",
            },
        ];
    }

    static get styles() {
        return [
            super.styles,
            css`
        .col-digest {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `,
        ];
    }

    render() {
        return html`
      <div
        role="heading"
        aria-level="${this.isSidebar ? "2" : "1"}"
        class="is-sr-only"
      >
        URLs in ${this.collInfo!.title}
      </div>

      <div
        role="heading"
        aria-level="${this.isSidebar ? "3" : "2"}"
        class="is-sr-only"
      >
        Search and Filter
      </div>
      <div class="notification level is-marginless">
        <div class="level-left flex-auto">
          <div class="level-item flex-auto">
            <span class="is-hidden-mobile">Search:&nbsp;&nbsp;</span>
            <div class="select">
              <select @change="${this.onChangeTypeSearch}">
                ${URLResources.filters.map(
            (filter) => html`
                    <option
                      value="${filter.filter}"
                      ?selected="${filter.filter === this.currMime}"
                    >
                      ${filter.name}
                    </option>
                  `
        )}
              </select>
            </div>
            <div class="field flex-auto">
              <div
                class="control has-icons-left ${this.loading
                ? "is-loading"
                : ""}"
              >
                <input
                  type="text"
                  class="input"
                  @input="${this.onChangeQuery}"
                  .value="${this.query}"
                  placeholder="Enter URL to Search"
                />
                <span class="icon is-left"
                  ><fa-icon .svg="${fasSearch}"></fa-icon
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="control level-right">
          <div style="margin-left: 1em" class="control">
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="contains"
                ?checked="${this.urlSearchType === "contains"}"
                @click="${this.onClickUrlType}"
              />&nbsp;Contains</label
            >
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="prefix"
                ?checked="${this.urlSearchType === "prefix"}"
                @click="${this.onClickUrlType}"
              />&nbsp;Prefix</label
            >
            <label class="radio has-text-left"
              ><input
                type="radio"
                name="urltype"
                value="exact"
                ?checked="${this.urlSearchType === "exact"}"
                @click="${this.onClickUrlType}"
              />&nbsp;Exact</label
            >
            <span
              id="num-results"
              class="num-results"
              is-pulled-right
              aria-live="polite"
              aria-atomic="true"
              >${this.filteredResults.length} Result(s)</span
            >
          </div>
        </div>
      </div>

      <div class="sort-header is-hidden-tablet">
        <wr-sorter
          id="urls"
          .sortKey="${this.sortKey}"
          .sortDesc="${this.sortDesc}"
          .sortKeys="${RecUrlResources.sortKeys}"
          .data="${this.filteredResults}"
          @sort-changed="${this.onSortChanged}"
        >
        </wr-sorter>
      </div>

      <div
        role="heading"
        aria-level="${this.isSidebar ? "3" : "2"}"
        id="results-heading"
        class="is-sr-only"
      >
        Results
      </div>

      <table class="all-results" aria-labelledby="results-heading num-results">
        <thead>
          <tr class="columns results-head has-text-weight-bold">
            <th scope="col" class="column col-url is-5 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${clickOnSpacebarPress}"
                data-key="url"
                class="${this.sortKey === "url"
                ? this.sortDesc
                    ? "desc"
                    : "asc"
                : ""}"
                >URL</a
              >
            </th>
            <th scope="col" class="column col-ts is-2 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${clickOnSpacebarPress}"
                data-key="ts"
                class="${this.sortKey === "ts"
                ? this.sortDesc
                    ? "desc"
                    : "asc"
                : ""}"
                >Date</a
              >
            </th>
            <th scope="col" class="column col-mime is-2 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${clickOnSpacebarPress}"
                data-key="mime"
                class="${this.sortKey === "mime"
                ? this.sortDesc
                    ? "desc"
                    : "asc"
                : ""}"
                >Media Type</a
              >
            </th>
            <th scope="col" class="column col-status is-1 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${clickOnSpacebarPress}"
                data-key="status"
                class="${this.sortKey === "status"
                ? this.sortDesc
                    ? "desc"
                    : "asc"
                : ""}"
                >Status</a
              >
            </th>
             <th scope="col" class="column col-digest is-2 is-hidden-mobile">
              <a
                role="button"
                href="#"
                @click="${this.onSort}"
                @keyup="${clickOnSpacebarPress}"
                data-key="digest"
                class="${this.sortKey === "digest"
                ? this.sortDesc
                    ? "desc"
                    : "asc"
                : ""}"
                >Digest</a
              >
            </th>
          </tr>
        </thead>

        <tbody class="main-scroll" @scroll="${this.onScroll}">
          ${this.sortedResults.length
                ? this.sortedResults.map(
                    (result) => html`
                  <tr class="columns result">
                    <td class="column col-url is-5">
                      <p class="minihead is-hidden-tablet">URL</p>
                      <a
                        class="dl-button"
                        href="${getDownloadLink(
                        this.collInfo!.replayPrefix,
                        result.url,
                        result.ts
                    )}"
                        ><fa-icon
                          size="1.0em"
                          class="has-text-black"
                          aria-hidden="true"
                          title="Download Resource"
                          .svg="${fasDownload}"
                        ></fa-icon>
                      </a>
                      <a
                        @click="${this.onReplay}"
                        data-url="${result.url}"
                        data-ts="${result.ts}"
                        href="${getReplayLink(
                        "resources",
                        result.url,
                        result.ts
                    )}"
                      >
                        <keyword-mark keywords="${this.query}"
                          >${result.url}</keyword-mark
                        >
                      </a>
                    </td>
                    <td class="column col-ts is-2">
                      <p class="minihead is-hidden-tablet">Date</p>
                      ${dateTimeFormatter.format(new Date(result.date))}
                    </td>
                    <td class="column col-mime is-2">
                      <p class="minihead is-hidden-tablet">Media Type</p>
                      ${result.mime}
                    </td>
                    <td class="column col-status is-1">
                      <p class="minihead is-hidden-tablet">Status</p>
                      ${result.status}
                    </td>
                    <td class="column col-digest is-2" title="${ifDefined((result as any).digest)}">
                      <p class="minihead is-hidden-tablet">Digest</p>
                      ${(result as any).digest}
                    </td>
                  </tr>
                `
                )
                : html`<tr class="section">
                <td colspan="5"><i>No Results Found.</i></td>
              </tr>`}
        </tbody>
      </table>
    `;
    }
}

customElements.define("wr-rec-resources", RecUrlResources);

export { RecUrlResources };
