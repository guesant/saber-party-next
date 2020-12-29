import { execSync } from "child_process";
import { FFMPEG } from "../binaries";

export const concat = async ({
  output,
  videos,
}: {
  output: string;
  videos: string[];
}) => {
  execSync(`${FFMPEG} -i "concat:${videos.join("|")}" -c copy ${output}`, {
    stdio: "ignore",
  });
};
