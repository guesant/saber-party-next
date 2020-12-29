import axios from "axios";
import fs from "fs";
import jetpack from "fs-jetpack";
import loChunk from "lodash/chunk";
import { extractMediaParts } from "../extractors/extractMediaParts";
import { cdnRoutes } from "../routes";
import { concat } from "../utils/concat";
import { wait } from "../utils/wait";
import { downloadLessonVideoTempPath } from "./downloadLessonVideoTempPath";

const log = (message: string) => process.stdout.write(message);

const padNumber = (number: number, max: number) =>
  number.toString().padStart(max.toString().length, "0");

export async function downloadLessonVideo(
  media: string,
  lessonId: string,
  outputFile: string,
) {
  const cdnMedia = cdnRoutes.lessonMedia({ media, lessonId });
  const mediaParts = await axios
    .get(cdnMedia)
    .then((res) => res.data)
    .then(extractMediaParts);
  const mediaPartsChunks = loChunk(mediaParts, 5);
  let chunkCounter = 1;
  for (const chunk of mediaPartsChunks) {
    log(
      [
        `Chunk ${padNumber(chunkCounter, mediaPartsChunks.length)} of ${
          mediaPartsChunks.length
        }`.padEnd(51, " "),
        "\r",
      ].join(""),
    );
    await Promise.all([
      ...chunk.map(async (mediaPart) => {
        await axios({
          method: "get",
          url: cdnRoutes.lessonMediaPart({ lessonId, mediaPart }),
          responseType: "stream",
        }).then((res) => {
          res.data.pipe(
            fs.createWriteStream(
              downloadLessonVideoTempPath(lessonId, mediaPart),
            ),
          );
        });
      }),
    ]);
    log(
      `Chunk ${padNumber(chunkCounter, mediaPartsChunks.length)} of ${
        mediaPartsChunks.length
      } - DONE\r`,
    );
    chunkCounter++;
    await wait(5000);
  }
  log("\n");
  log("Renderizando...\r");
  await concat({
    output: outputFile,
    videos: [
      ...mediaParts.map((mediaPart) =>
        downloadLessonVideoTempPath(lessonId, mediaPart),
      ),
    ],
  }).then(() => jetpack.removeAsync(downloadLessonVideoTempPath(lessonId, "")));
  log("Renderizado\n");
}
