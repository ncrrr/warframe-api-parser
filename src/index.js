const express = require("express");
const { startPolling } = require("./cache");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(routes);

app.listen(PORT, 'kitty-hosting.com', () => {
  console.log(`[server] Listening on http://0.0.0.0:${PORT}`);
  startPolling();
});
