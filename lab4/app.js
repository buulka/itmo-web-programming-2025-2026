export default function appSrc(express) {
  const app = express();

  app.use((req, res, next) => {
    if (!req.path.endsWith('/')) {
      return res.redirect(301, req.path + '/');
    }
    next();
  });

  app.get('/login/', (req, res) => {
    res.send('bulkahleba');
  });

  app.get('/id/:n/', async (req, res) => {
    try {
      const response = await fetch(`https://nd.kodaktor.ru/users/${req.params.n}`);
      const data = await response.json();
      res.send(data.login ?? '');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  return app;
}