import { createRepo } from "ipfs-repo";

import { MemoryLock } from "ipfs-repo/locks/memory";
import { MemoryDatastore } from "datastore-core";
import { MemoryBlockstore } from "blockstore-core";

import * as dagPb from "@ipld/dag-pb";
import * as dagCbor from "@ipld/dag-cbor";
import * as raw from "multiformats/codecs/raw";

// multiformat codecs to support
const codecs = [dagPb, dagCbor, raw].reduce((acc, curr) => {
  acc[curr.name] = curr;
  acc[curr.code] = curr;
  return acc;
}, {});

export async function createInMemoryRepo() {
  const loadCodec = (nameOrCode) => {
    if (codecs[nameOrCode]) {
      return codecs[nameOrCode];
    }

    throw new Error(`Could not load codec for ${nameOrCode}`);
  };

  const repo = createRepo(
    "",
    loadCodec,
    {
      root: new MemoryDatastore(),

      blocks: new MemoryBlockstore(),

      keys: new MemoryDatastore(),
      datastore: new MemoryDatastore(),
      pins: new MemoryDatastore(),
    },
    {
      lock: MemoryLock,
      autoMigrate: false,
      repoOwner: true,
    }
  );

  return {
    repo,
    init: {
      emptyRepo: true,
      privateKey:
        "CAESQEQh005HaHeDzbnAkjryrcNJSkUakq/yx6HTIS6OpgATcwTxOtfrp2I6clTqVdDMMTRC9JUua/xUp+ZmGDd8EVo=",
    },

    offline: true,
    start: false,

    config: {
      Bootstrap: [],
    },

    libp2p: {
      nat: {
        enabled: false,
      },
    },
  };
}
