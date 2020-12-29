import axios from "axios";
import config from "config";
import inquirer from "inquirer";
import slug from "slug";
import { extractExtMedias } from "../extractors/extractExtMedias";
import { downloadLesson } from "../headless/downloadLesson";
import { cdnRoutes } from "../routes";
import { wait } from "../utils/wait";

export type LessonListItem = {
  url: string;
  sourceURL: string;
  text: string;
};

const CONFIG_OUTPUT_PATH = config.get("dist.defaultOutputPath");

const OUTPUT_PATH =
  typeof CONFIG_OUTPUT_PATH === "string" ? CONFIG_OUTPUT_PATH : process.cwd();

export async function expertDownloadLesson(lessonList: LessonListItem[]) {
  const { MultiSelect } = require("enquirer");
  const prompt = new MultiSelect({
    name: "value",
    message: "Escolha as aulas a serem baixadas:",
    choices: [
      ...lessonList.map(({ text, sourceURL }) => ({
        name: text,
        value: sourceURL,
      })),
    ],
    result(names: string[]) {
      return this.map(names);
    },
  });
  const selectedLessons: { title: string; source: string }[] = await prompt
    .run()
    .then((answer: any) =>
      Object.entries(answer).map(([k, v]) => ({ title: k, source: v })),
    )
    .catch(console.error);

  const { distFolder } = await inquirer.prompt([
    {
      type: "input",
      name: "distFolder",
      message: "Onde deseja salvar o arquivo?",
      default: OUTPUT_PATH,
    },
  ]);

  for (const { title: lessonName, source } of selectedLessons) {
    const lessonId = source.match(/HLS\/([^/]*)/)![1];
    const medias = await axios
      .get(cdnRoutes.lessonMedias({ lessonId }))
      .then((res) => res.data)
      .then((ext) => extractExtMedias(ext));
    const selectedMedia =
      medias.find(({ resolution }) => resolution.includes("480")) || medias[0];
    const distFileVideo =
      [slug(lessonName), selectedMedia.resolution].join("-") + ".mp4";
    const distFileCaptions = [slug(lessonName)].join("-") + ".vtt";
    console.log(`Baixando ${distFileVideo}...`);
    await downloadLesson(
      selectedMedia.resource,
      lessonId,
      distFolder,
      distFileVideo,
      distFileCaptions,
    );
    console.log("ok");
    await wait(15000);
  }
}

const lessonList: LessonListItem[] = [];

expertDownloadLesson(lessonList);
