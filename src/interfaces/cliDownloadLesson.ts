import axios from "axios";
import inquirer from "inquirer";
import slug from "slug";
import { extractExtMedias } from "../extractors/extractExtMedias";
import { cdnRoutes } from "../routes";
import { downloadLesson } from "../headless/downloadLesson";
import config from "config";

const CONFIG_OUTPUT_PATH = config.get("dist.defaultOutputPath");

const OUTPUT_PATH =
  typeof CONFIG_OUTPUT_PATH === "string" ? CONFIG_OUTPUT_PATH : process.cwd();

export async function cliDownloadLesson(lessonIdArgument?: string) {
  const lessonId =
    lessonIdArgument ||
    (
      await inquirer.prompt([
        {
          type: "input",
          name: "lessonId",
          message: "Qual o id da lição?",
        },
      ])
    ).lessonId;

  const medias = await axios
    .get(cdnRoutes.lessonMedias({ lessonId }))
    .then((res) => res.data)
    .then((ext) => extractExtMedias(ext));

  const { lessonName, media } = await inquirer.prompt([
    {
      type: "list",
      name: "media",
      message: "Qual recurso deseja baixar?",
      choices: [
        ...medias.map((media) => ({ name: media.resource, value: media })),
      ],
    },
    {
      type: "input",
      name: "lessonName",
      message: "Qual o nome da aula?",
    },
  ]);

  const { distFolder, distFileVideo, distFileCaptions } = await inquirer.prompt(
    [
      {
        type: "input",
        name: "distFolder",
        message: "Onde deseja salvar o arquivo?",
        default: OUTPUT_PATH,
      },
      {
        type: "input",
        name: "distFileVideo",
        message: "Nome do arquivo de vídeo:",
        default: [slug(lessonName), media.resolution].join("-") + ".mp4",
      },
      {
        type: "input",
        name: "distFileCaptions",
        message: "Nome do arquivo de audiodescrição:",
        default: [slug(lessonName)].join("-") + ".vtt",
      },
    ],
  );

  await downloadLesson(
    media.resource,
    lessonId,
    distFolder,
    distFileVideo,
    distFileCaptions,
  );

  console.log("ok");
}

cliDownloadLesson();
