# warframe-api-parser

Caching proxy for the [Warframe World State API](https://api.warframestat.us/pc/). Fetches the full world state every 60 seconds and serves individual sections via sub-routes.

## Setup

```sh
npm install
npm start
```

Server runs on `http://localhost:3000` (override with `PORT` env var).

## Routes

| Route | Description |
|-------|-------------|
| `GET /` | Lists available routes and cache metadata |
| `GET /all` | Returns the full cached world state |
| `GET /:key` | Returns a specific section (e.g. `/news`, `/fissures`, `/sortie`) |

## Development

```sh
npm run dev
```

Uses `node --watch` for auto-restart on file changes.
