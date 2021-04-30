// import { render } from "https://deno.land/x/dejs@0.9.3/mod.ts";

import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

import { mainTemplate } from './src/templates.ts';
import { listGifs, openGif } from './src/gifs.ts';
import { openBrowser } from './src/shell.ts'

const gifs = [...listGifs('.')]

const app = new Application();
// app routes
const router = new Router();
router
  .get("/", (context) => {
    context.response.body = mainTemplate(gifs);
  })
  .get("/open/:path*", (context) => {
    if (context.params.path) {
      openGif(context.params.path);
    }
    context.response.redirect('/')
  });
app.use(router.routes());
app.use(router.allowedMethods());

// serve GIFs as static content
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: Deno.cwd(),
    extensions: ['.gif', '.GIF']
  });
});

// exit the server after 5 minutes
const autoExitAfterMin = 5;
setTimeout(() => { Deno.exit(0); }, autoExitAfterMin * 60 * 1000);

// open the browser once the server is up
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`Listening port ${port} for ${autoExitAfterMin} minutes...`);
  openBrowser(`http://localhost:${port}/`)
});

await app.listen({ port: 8000 });
