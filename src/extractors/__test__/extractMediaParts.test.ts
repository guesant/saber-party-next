import { extractMediaParts } from "../extractMediaParts";

test("extractMediaParts from payload", () => {
  expect(
    extractMediaParts(`#EXTM3U
  #EXT-X-VERSION:3
  #EXT-X-TARGETDURATION:13
  #EXT-X-MEDIA-SEQUENCE:1
  #EXT-X-PLAYLIST-TYPE:VOD
  #EXTINF:12,
  394968632.hd_72020200529T125653_00001.ts
  #EXTINF:1,
  394968632.hd_72020200529T125657_00002.ts
  #EXT-X-ENDLIST`),
  ).toEqual([
    "394968632.hd_72020200529T125653_00001.ts",
    "394968632.hd_72020200529T125657_00002.ts",
  ]);
});
