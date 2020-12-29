# saber-party-next

## Dependências

- ffmpeg (Veja: [Instalando ffmpeg localmente](#instalando-ffmpeg-localmente))

## Instalação

Esse projeto utiliza o gerenciador de pacotes [pnpm](https://pnpm.js.org/).

```sh
npm i -g pnpm
git clone https://github.com/guesant/saber-party-next.git
cd saber-party-next
pnpm install
```

### Instalando ffmpeg localmente

```sh
npm i ffmpeg-static
```

```diff
// src/binaries.ts

- import config from "config";
+ import localFFmpeg from "ffmpeg-static";

- export const FFMPEG = config.get<string>("bin.ffmpeg") || "ffmpeg";
+ export const FFMPEG = localFFmpeg;
```

## Uso

```sh
pnpx ts-node src/interfaces/cliDownloadLesson.ts
```

---

## Sobre

Autor: Gabriel Rodrigues - 2020. - https://github.com/guesant

Licensa: [GPL-3.0](./LICENSE)
