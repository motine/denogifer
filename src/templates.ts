export const mainTemplate = (gifs: Array<string>) => `
<html>
<body>
<style type="text/css">
  body {
    background-color: #333;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
  }
  a {
    display: block;
    background-size: cover;
    width: 100%;
    height: 20vw;
  }
</style>
${gifs.map((path) => `<a href="/open/${encodeURI(path)}" style="background-image: url('${path}')"></a>`).join("\n")}
</body>
</html>
`