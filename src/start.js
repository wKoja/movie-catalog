import app from "./server.js";
const PORT = 8080;

app.listen(PORT, () =>
  console.log(`aplicacao subiu com sucesso em http://localhost:${PORT}`)
);
