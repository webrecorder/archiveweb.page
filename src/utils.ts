import { getCollData } from "@webrecorder/wabac/src/utils";
import { getLocalOption, setLocalOption } from "./localstorage";

// ===========================================================================
export async function ensureDefaultColl(collLoader) {
  let colls = await collLoader.listAll();

  if (!colls.length) {
    const metadata = { title: "My Archiving Session" };
    const result = await collLoader.initNewColl(metadata);

    await setLocalOption("defaultCollId", result.name);

    colls = [result];
  } else {
    const defaultId = await getLocalOption("defaultCollId");

    for (const coll of colls) {
      if (coll.name === defaultId) {
        return colls;
      }
    }

    await setLocalOption("defaultCollId", colls[0].name);
  }

  return colls;
}

// ===========================================================================
export async function listAllMsg(collLoader, { defaultCollId = null } = {}) {
  let colls = await ensureDefaultColl(collLoader);

  colls = colls.map((x) => getCollData(x));

  // sort same way as the UI collections index
  const sortKey = await getLocalOption("index:sortKey");
  const sortDesc = (await getLocalOption("index:sortDesc")) === "1";

  colls.sort((first, second) => {
// @ts-expect-error - TS2538 - Type 'unknown' cannot be used as an index type. | TS2538 - Type 'unknown' cannot be used as an index type.
    if (first[sortKey] === second[sortKey]) {
      return 0;
    }

// @ts-expect-error - TS2538 - Type 'unknown' cannot be used as an index type. | TS2538 - Type 'unknown' cannot be used as an index type.
    return sortDesc == first[sortKey] < second[sortKey] ? 1 : -1;
  });

  const msg = { type: "collections" };
// @ts-expect-error - TS2339 - Property 'collId' does not exist on type '{ type: string; }'.
  msg.collId = defaultCollId || (await getLocalOption("defaultCollId"));
// @ts-expect-error - TS2339 - Property 'collections' does not exist on type '{ type: string; }'.
  msg.collections = colls.map((coll) => ({
    id: coll.id,
    title: coll.title || coll.filename,
  }));

  return msg;
}
