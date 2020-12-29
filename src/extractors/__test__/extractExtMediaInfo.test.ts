import { extractExtMediaInfo } from "../extractExtMediaInfo";

test("extractExtMediaInfo from payload", () => {
  expect(
    extractExtMediaInfo(
      'BANDWIDTH=1501871,AVERAGE-BANDWIDTH=653850,CODECS="avc1.640028,mp4a.40.5",RESOLUTION=1280x720',
    ),
  ).toEqual({
    BANDWIDTH: 1501871,
    RESOLUTION: "1280x720",
    "AVERAGE-BANDWIDTH": 653850,
    CODECS: "avc1.640028,mp4a.40.5",
  });
});
