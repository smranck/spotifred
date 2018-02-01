const Koa = require('koa');
const Router = require('koa-router');
const Parser = require('koa-body');
const logger = require('koa-morgan');
const responseTime = require('koa-response-time');

const db = require('../database/index.js');

// might not need to have the /index.js here?

const app = new Koa();
const router = new Router();
const PORT = 3000; // could do productionPort || 3000 as needed

router.get('/test/:id', (ctx, next) => {
  // ctx.router available
  console.log('88888888888888888888888888888888888888888888888', ctx);
  ctx.body = `test id is ${ctx.params.id}`;
});

// for immediate relief
router.get('/songs/immediateDeets/:songID', (ctx, next) => {
  // ctx.router available
  // ctx.body = db.getSongDetails(ctx.params.songID);
  console.log('/songs/immediateDeets/:songID');
});

router.get('/songs/deets', (ctx, next) => {
  // ctx.router available
  // db.getManyDetails()
});

router.post('/', (ctx, next) => {
  // ctx.router available
  // db.addSong()
});

router.post('/songs/addSong', (ctx, next) => {
  // ctx.router available
  // db.removeSong()
  console.log(ctx.req.body);
  ctx.body = ctx.req.body || 'Hello There';
});

router.post('/songs/removeSong', (ctx, next) => {
  // ctx.router available
});

app
  .use(responseTime())
  .use(logger('combined'))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(Parser());

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
