import jetpack from "fs-jetpack";
import path from "path";

export const getTempFolder = () => {
  const tempFolder = path.resolve(__dirname, "../../temp");
  jetpack.dir(tempFolder);
  return tempFolder;
};

export const tempFolder = getTempFolder();
