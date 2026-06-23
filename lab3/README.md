# Express Web Application

A simple Express.js web application built as part of a Web Programming course assignment.

## Stack

- Node.js (ESM)
- Express
- body-parser

## Project Structure

```
├── app.js        # Express app logic and routes
├── index.js      # Entry point
├── package.json  # Project config and dependencies
└── .gitignore
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/login/` | Returns the author's LMS login |
| GET | `/code/` | Returns the source code of `app.js` |
| GET | `/sha1/:input/` | Returns SHA1 hash of the given string |
| GET, POST | `/req/?addr=` | Fetches and returns the content of the given URL |
| ALL | `*` | Catch-all — returns the author's LMS login |

## Features

- CORS headers on all responses (`Access-Control-Allow-Origin: *`)
- Trailing slash policy — all URIs end with `/`
- ESM module syntax (`import`/`export`)
- No external dependencies beyond `express` and `body-parser`

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
node index.js
```

The app listens on `process.env.PORT` (set by the hosting provider) or falls back to nothing if not set — set it manually for local use:

```bash
PORT=3000 node index.js
```

## Deployment

The app is designed to be deployed on [Replit](https://replit.com). Once running, it is available over HTTPS at a public URL provided by Replit.

## Example Requests

```bash
# Get login
curl https://your-app.repl.co/login/

# Get SHA1 hash
curl https://your-app.repl.co/sha1/hello/

# Fetch external URL (GET)
curl 'https://your-app.repl.co/req/?addr=http://example.com/'

# Fetch external URL (POST)
curl https://your-app.repl.co/req/ -d 'addr=http://example.com/'
```
