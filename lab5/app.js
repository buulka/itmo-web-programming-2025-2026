export default function appSrc(express) {
  const app = express();

  app.get('/add/:x1/:x2', (req, res) => {
    const result = Number(req.params.x1) + Number(req.params.x2);
    res.type('text').send(String(result));
  });

  app.get('/mpy/:y1/:y2', (req, res) => {
    const result = Number(req.params.y1) * Number(req.params.y2);
    res.type('text').send(String(result));
  });

  app.get('/:date', (req, res) => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const today = `${dd}${mm}${yy}`;
    if (req.params.date === today) {
      res.type('text').send('bulkahleba');
    } else {
      res.status(404).send('');
    }
  });

  return app;
}