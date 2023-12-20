import { getCollData } from "@webrecorder/wabac/src/utils";
import { getLocalOption, setLocalOption } from "./localstorage";


// ===========================================================================
export async function ensureDefaultColl(collLoader)
{
  let colls = await collLoader.listAll();

  if (!colls.length) {
    const metadata = {"title": "My Archiving Session"};
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
export async function listAllMsg(collLoader, {defaultCollId = null} = {}) {
  let colls = await ensureDefaultColl(collLoader);

  colls = colls.map(x => getCollData(x));

  // sort same way as the UI collections index
  const sortKey = await getLocalOption("index:sortKey");
  const sortDesc = await getLocalOption("index:sortDesc") === "1";

  colls.sort((first, second) => {
    if (first[sortKey] === second[sortKey]) {
      return 0;
    }

    return (sortDesc == (first[sortKey] < second[sortKey])) ? 1 : -1;
  });

  const msg = {type: "collections"};
  msg.collId = defaultCollId || await getLocalOption("defaultCollId");
  msg.collections = colls.map(coll => ({
    id: coll.id,
    title: coll.title || coll.filename
  }));

  return msg;
}
