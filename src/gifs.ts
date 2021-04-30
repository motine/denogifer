import { run } from './shell.ts'

// parse all directories
export function* listGifs(dir: string): Generator<string> {
  for (let dirEntry of Deno.readDirSync(dir)) {
    if (dirEntry.isDirectory) {
      yield* listGifs(`${dir}/${dirEntry.name}`);
    } else {
      if (dirEntry.name.toLowerCase().endsWith(".gif")) {
        yield `${dir}/${dirEntry.name}`;
      }
    }
  }
}

export async function openGif(path: string) {
  run(["/usr/bin/open", "-R", path])
}
