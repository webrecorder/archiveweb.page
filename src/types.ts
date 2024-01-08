import { type ItemType } from "replaywebpage";

export type WrRecItem = ItemType & {
  uploadTime?: number;
  mtime: number;
  sourceUrl?: string;
  ipfsPins?: { url: string }[];
  uploadId: string;
};
