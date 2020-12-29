import { extractExtMediaInfo } from "./extractExtMediaInfo";

/*

#EXTM3U
#EXT-X-VERSION:3
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-STREAM-INF:BANDWIDTH=1501871,AVERAGE-BANDWIDTH=653850,CODECS="avc1.640028,mp4a.40.5",RESOLUTION=1280x720
394968632.hd_720.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1152666,AVERAGE-BANDWIDTH=397321,CODECS="avc1.640028,mp4a.40.5",RESOLUTION=854x480
394968632.hd_480.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=560181,AVERAGE-BANDWIDTH=308341,CODECS="avc1.640028,mp4a.40.5",RESOLUTION=640x360
394968632.hd_360.m3u8

[
  {
    resolution: "1280x720",
    resource: "394968632.hd_720.m3u8"
  },
  {
    resolution: "854x480",
    resource: "394968632.hd_480.m3u8"
  },
  {
    resolution: "640x360",
    resource: "394968632.hd_360.m3u8"
  }
]

*/

export function extractExtMedias(ext: string) {
  const regExp = /\#EXT\-X\-STREAM\-INF\:(.+)\n(.+)/gi;
  return Array.from(ext.matchAll(regExp)).map(([, info, res]) => {
    const resource = res.trim();
    const { RESOLUTION: resolution } = extractExtMediaInfo(info);
    return {
      resource,
      resolution,
    };
  });
}
