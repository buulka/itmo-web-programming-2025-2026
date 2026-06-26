import express from 'express';
import { gzip } from 'zlib';

const HTML_FORM = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Zipper</title></head>
<body>
  <form method="POST" action="/zipper" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>`;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function extractFile(body, boundary) {
  const dash = '--' + boundary;
  const pos = body.indexOf(dash);
  if (pos === -1) return null;

  const headersEnd = body.indexOf('\r\n\r\n', pos + dash.length);
  if (headersEnd === -1) return null;

  const contentStart = headersEnd + 4;
  const nextBoundary = body.indexOf('\r\n--' + boundary, contentStart);
  const contentEnd = nextBoundary === -1 ? body.length : nextBoundary;

  return body.slice(contentStart, contentEnd);
}

const app = express();

app.get('/login', (req, res) => {
  res.type('text').send('bulkahleba');
});

app.get('/zipper', (req, res) => {
  res.type('html').send(HTML_FORM);
});

app.post('/zipper', async (req, res) => {
  const contentType = req.headers['content-type'] || '';
  const m = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/);
  if (!m) return res.status(400).send('Bad Request: missing boundary');

  const boundary = m[1] ?? m[2];
  const body = await readBody(req);
  const fileBuffer = extractFile(body, boundary);

  if (!fileBuffer) return res.status(400).send('Bad Request: no file found');

  gzip(fileBuffer, (err, compressed) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.set({
      'Content-Type': 'application/gzip',
      'Content-Disposition': 'attachment; filename="result.gz"',
      'Content-Length': compressed.length,
    });
    res.send(compressed);
  });
});

export default app;