export async function run(cmd: Array<string>) {
  const p = Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped'
  });
  const status = await p.status(); // we could wait for it to complete
  if (!status.success) {
    Deno.copy(p.stdout, Deno.stdout);
    Deno.copy(p.stderr, Deno.stderr);
  }
}

export async function openBrowser(url : string) {
  run(["/usr/bin/open", url])
}