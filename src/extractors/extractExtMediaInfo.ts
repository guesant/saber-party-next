import { tryParse } from "../utils/tryParse";

/*

BANDWIDTH=1501871,AVERAGE-BANDWIDTH=653850,CODECS="avc1.640028,mp4a.40.5",RESOLUTION=1280x720

{
  BANDWIDTH: 1501871,
  RESOLUTION: "1280x720",
  AVERAGE-BANDWIDTH: 653850,
  CODECS: "avc1.640028,mp4a.40.5",
}

*/

export function extractExtMediaInfo(info: string): { [key: string]: any } {
  return info
    .replace(/(?<=")[^,"]+(,)[^,"]+(?=")/gi, (match) =>
      encodeURIComponent(match),
    )
    .split(",")
    .map((i) => i.split("="))
    .map(([key, value]) => [key, decodeURIComponent(value)])
    .map(([key, value]) => [key, tryParse(value, (i: any) => String(i).trim())])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
