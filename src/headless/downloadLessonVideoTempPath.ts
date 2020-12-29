import jetpack from "fs-jetpack";
import path from "path";
import { tempFolder } from "../utils/getTempFolder";

export const downloadLessonVideoTempPath = (
  lessonId: string,
  extendPath: string,
) => {
  jetpack.dir(path.join(tempFolder, lessonId));
  return path.join(tempFolder, lessonId, ...(extendPath ? [extendPath] : []));
};
