import express from 'express'

import routes from './routes'

const port = process.env.PORT || 3000;

const setupExpress = async () => {
  const app = express();
  
  app.use('/', routes);

  app.get('/', (req, res) => {
    res.send("Hello World!");
  });

  const listener = app.listen(port, () => {
    // @ts-ignore
    console.log(`Your app is listening on port ${listener.address().port}`);
  });
}

export default setupExpress