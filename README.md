# Deno GIF Browser

Please start in the folder you want to serve GIFs from.


```bash
deno run --allow-read --allow-net --allow-run denogifer.ts # run
# build
deno compile --allow-read --allow-net --allow-run --target x86_64-apple-darwin --unstable --lite denogifer.ts
```