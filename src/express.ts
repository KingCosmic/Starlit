import express from 'express'

import routes from './routes'

const port = process.env.PORT || 3000;

const setupExpress = async () => {
  // create our express server
  const app = express();
  
  // setup our routes
  app.use('/', routes);

  // this is just a test route
  app.get('/', (req, res) => {
    res.send("Hello World!");
  });

  // start our server
  const listener = app.listen(port, () => {
    // @ts-ignore
    console.log(`Your app is listening on port ${listener.address().port}`);
  });
}

export default setupExpress