import { execSync } from "child_process";

export const concat = async ({
  output,
  videos,
}: {
  output: string;
  videos: string[];
}) => {
  execSync(`ffmpeg -i "concat:${videos.join("|")}" -c copy ${output}`, {
    stdio: "ignore",
  });
};
