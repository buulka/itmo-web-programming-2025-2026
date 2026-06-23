export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.text());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type, x-author, ngrok-skip-browser-warning');
    next();
  });

  app.use((req, res, next) => {
    if (!req.path.endsWith('/')) {
      return res.redirect(301, req.path + '/' + (req.search || ''));
    }
    next();
  });

  app.get('/login/', (req, res) => {
    res.send('itmo1234567');
  });

  app.get('/code/', (req, res) => {
    const filePath = import.meta.url.substring(7);
    const stream = createReadStream(filePath);
    res.setHeader('Content-Type', 'text/plain');
    stream.pipe(res);
  });

  app.get('/sha1/:input/', (req, res) => {
    const hash = crypto.createHash('sha1').update(req.params.input).digest('hex');
    res.send(hash);
  });

  app.get('/req/', (req, res) => {
    const addr = req.query.addr;
    http.get(addr, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => { res.send(data); });
    }).on('error', (err) => { res.status(500).send(err.message); });
  });

  app.post('/req/', (req, res) => {
    const addr = req.query.addr || req.body?.addr || req.body;
    http.get(addr, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => { res.send(data); });
    }).on('error', (err) => { res.status(500).send(err.message); });
  });

  app.all('*', (req, res) => {
    res.send('bulkahleba');
  });

  return app;
}