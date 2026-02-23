const { Router } = require("express");
const { getData, getLastUpdated, getAvailableKeys } = require("./cache");

const router = Router();

// GET / — overview: available keys + cache metadata
router.get("/", (_req, res) => {
  const data = getData();
  if (!data) return res.status(503).json({ error: "Cache not ready yet" });

  res.json({
    lastUpdated: getLastUpdated(),
    availableRoutes: getAvailableKeys().map((k) => `/${k}`),
  });
});

// GET /all — return the full cached world state
router.get("/all", (_req, res) => {
  const data = getData();
  if (!data) return res.status(503).json({ error: "Cache not ready yet" });
  res.json(data);
});

// GET /:key — return a specific top-level key from the cached data
router.get("/:key", (req, res) => {
  const data = getData();
  if (!data) return res.status(503).json({ error: "Cache not ready yet" });

  const { key } = req.params;
  if (!(key in data)) {
    return res.status(404).json({
      error: `Unknown key "${key}"`,
      availableKeys: getAvailableKeys(),
    });
  }

  res.json({ [key]: data[key] });
});

module.exports = router;
