require('newrelic');
const Koa = require('koa');
const Router = require('koa-router');
const Parser = require('koa-body');
const logger = require('koa-morgan');
const responseTime = require('koa-response-time');
const db = require('../database/index.js');

const app = new Koa();
const router = new Router();
const PORT = 3000; // could do productionPort || 3000 as needed

// for immediate relief
// TODO: refactor to cb for speed
router.get('/songs/immediateDeets/:songID', async (ctx, next) => {
  try {
    ctx.response.body = await db.getSongDetails(ctx.params.songID);
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.body = err;
  }
});

router.get('/songs/deets/:songID', async (ctx, next) => {
  try {
    ctx.response.body = await db.getSongDetails(ctx.params.songID);
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.body = err;
  }
});

// here the body of the post is the song object
router.post('/songs/addSong', async (ctx, next) => {
  try {
    ctx.response.body = await db.addSong(ctx.request.body);
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.body = err;
  }
});

router.post('/songs/removeSong/:songID', async (ctx, next) => {
  try {
    ctx.response.body = await db.removeSong(ctx.params.songID);
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.body = err;
  }
});

app
  .use(responseTime())
  .use(Parser())
  .use(router.routes())
  .use(logger('combined'))
  .use(router.allowedMethods());

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
