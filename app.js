const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const {Queue} = require('bullmq');
const basePath = process.env.BASE_PATH || '/admin/queues';
const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
  db: process.env.REDIS_DB || 0,
};

const app = express();

// Create a Bull queue
initQueues();

initBullBoard();

function initBullBoard(){
  // Set up Bull Board
  const serverAdapter = new ExpressAdapter();
  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: Object.values(global.queues).map(q => new BullAdapter(q)),
    serverAdapter: serverAdapter,
  });

  serverAdapter.setBasePath(basePath);

  // Define a route for the root URL
  app.get('/', (req, res) => {
    if (Object.keys(global.queues).length === 0) {
      res.redirect('/no-queues');
    } else {
      res.redirect(basePath);
    }
  });

  // New route for the "no queues" page
  app.get('/no-queues', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>No Queues Initialized</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>No Queues Initialized</h1>
          <p>There are currently no queues initialized in the system.</p>
        </body>
      </html>
    `);
  });

  app.use(basePath, serverAdapter.getRouter());

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Start the server
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
    console.log(`Bull Board is available at http://localhost:${3000}/admin/queues`);
  });
}

/**
 * @usage: To initialize queues with a custom Redis connection
 */
function initQueues() {
  let queues = typeof process.env.QUEUES == 'string'? process.env.QUEUES.split(',') : process.env.QUEUES || [];
  global.queues = {};
  for (let q of queues) {
    global.queues[q] = new Queue(q, {
      connection: redisConfig
    });
  }
}
