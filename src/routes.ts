import config from "config";
import { Ruty } from "ruty";

const { route } = Ruty.configure({
  prefix: config.get("cdn.cdnPrefix"),
});

export const cdnRoutes = {
  captions: route("/HLS/:lessonId/:lessonId.vtt").build<{ lessonId: string }>(),
  lessonMedias: route("/HLS/:lessonId/:lessonId.m3u8").build<{
    lessonId: string;
  }>(),
  lessonMedia: route("/HLS/:lessonId/:media").build<{
    lessonId: string;
    media: string;
  }>(),
  lessonMediaPart: route("/HLS/:lessonId/:mediaPart").build<{
    lessonId: string;
    mediaPart: string;
  }>(),
};
