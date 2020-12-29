import config from "config";

export const FFMPEG = config.get<string>("bin.ffmpeg") || "ffmpeg";
