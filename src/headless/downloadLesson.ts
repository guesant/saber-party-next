import axios from "axios";
import fs from "fs";
import jetpack from "fs-jetpack";
import path from "path";
import { cdnRoutes } from "../routes";
import { downloadLessonVideo } from "./downloadLessonVideo";

export async function downloadLesson(
  resource: string,
  lessonId: string,
  distFolder: string,
  distFileVideo: string,
  distFileCaptions: string,
) {
  jetpack.dir(distFolder);
  await Promise.all([
    downloadLessonVideo(
      resource,
      lessonId,
      path.join(distFolder, distFileVideo),
    ),
    axios({
      method: "get",
      url: cdnRoutes.captions({ lessonId }),
      responseType: "stream",
    }).then((res) => {
      res.data.pipe(
        fs.createWriteStream(path.join(distFolder, distFileCaptions)),
      );
    }),
  ]);
}
