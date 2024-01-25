import { type ItemType } from "replaywebpage";
import { type BtrixClient } from "./ui/upload";

type Identity<T extends object> = { [k in keyof T]: T[k] };

export type WrRecItem = Identity<
  ItemType & {
    uploadTime?: number;
    mtime: number;
    sourceUrl?: string;
    ipfsPins?: { url: string }[];
    uploadId: string;
  }
>;

export type BtrixOpts = {
  url: string;
  username: string;
  password: string;
  orgName: string;
  client?: BtrixClient;
};
